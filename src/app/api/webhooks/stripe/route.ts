import {
  getCaseByStripeSession,
  markCasePaid,
} from "@/lib/cases/store";
import {
  handleSubscriptionInvoicePaid,
  handleSubscriptionLifecycle,
  syncCustomerStripeSubscription,
} from "@/lib/customer-portal/stripe-subscription";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { claimStripeEvent } from "@/lib/stripe-event-receipt";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const stripe = getStripe();
  const sig = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: "Webhook misconfigured" }, { status: 400 });
  }

  const raw = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error("[stripe-webhook]", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const claim = await claimStripeEvent(event.id, event.type);
  if (claim === "duplicate") {
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.metadata?.billing === "overage" && session.metadata.periodId) {
          const { addOverageCreditFromStripe } = await import(
            "@/lib/customer-portal/subscription-period"
          );
          const result = await addOverageCreditFromStripe({
            periodId: session.metadata.periodId,
            stripeSessionId: session.id,
          });
          if (result === "applied") {
            const { recordOverageSale } = await import(
              "@/lib/customer-portal/overage-sale"
            );
            await recordOverageSale({
              periodId: session.metadata.periodId,
              stripeSessionId: session.id,
            });
            const { clearPendingOverageSession } = await import(
              "@/lib/customer-portal/subscription-period"
            );
            await clearPendingOverageSession(session.metadata.periodId);
          } else if (result === "duplicate") {
            const { reconcileOverageSale, recordOverageSale } = await import(
              "@/lib/customer-portal/overage-sale"
            );
            const created = await recordOverageSale({
              periodId: session.metadata.periodId,
              stripeSessionId: session.id,
            });
            if (!created) {
              await reconcileOverageSale({
                periodId: session.metadata.periodId,
                stripeSessionId: session.id,
              });
            }
            const { clearPendingOverageSession } = await import(
              "@/lib/customer-portal/subscription-period"
            );
            await clearPendingOverageSession(session.metadata.periodId);
          }
          if (result === "period_inactive") {
            console.error("[stripe-webhook] overage on inactive period", {
              periodId: session.metadata.periodId,
              sessionId: session.id,
            });
          }
          break;
        }
        const caseId =
          session.metadata?.caseId || session.client_reference_id || null;
        const customerId =
          typeof session.customer === "string" ? session.customer : undefined;
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : undefined;
        if (caseId) {
          const paid = await markCasePaid(caseId, {
            stripeSessionId: session.id,
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
          });
          if (paid) {
            if (subscriptionId && paid.customer.email) {
              await syncCustomerStripeSubscription({
                email: paid.customer.email,
                stripeCustomerId: customerId,
                stripeSubscriptionId: subscriptionId,
                packageSlug: paid.packageSlug,
                status: "active",
              });
            }
            void import("@/lib/analytics").then(({ trackEvent }) =>
              trackEvent("payment_completed", {
                caseId: paid.id,
                packageSlug: paid.packageSlug,
                amountCents: paid.payment.amountCents,
              }, paid.locale),
            );
          }
        } else if (session.id) {
          const existing = await getCaseByStripeSession(session.id);
          if (existing) {
            const paid = await markCasePaid(existing.id, {
              stripeSessionId: session.id,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
            });
            if (paid) {
              if (subscriptionId && paid.customer.email) {
                await syncCustomerStripeSubscription({
                  email: paid.customer.email,
                  stripeCustomerId: customerId,
                  stripeSubscriptionId: subscriptionId,
                  packageSlug: paid.packageSlug,
                  status: "active",
                });
              }
              void import("@/lib/analytics").then(({ trackEvent }) =>
                trackEvent("payment_completed", {
                  caseId: paid.id,
                  packageSlug: paid.packageSlug,
                  amountCents: paid.payment.amountCents,
                }, paid.locale),
              );
            }
          }
        }
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const result = await handleSubscriptionInvoicePaid(invoice, stripe);
        if (result === "error") {
          console.error("[stripe-webhook] invoice.paid renew failed", {
            invoiceId: invoice.id,
          });
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionLifecycle(subscription);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("[stripe-webhook] handler", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
