import { canUsePasswordReset } from "@/lib/customer-portal/membership";
import {
  createPortalLoginToken,
  findCustomerByEmail,
} from "@/lib/customer-portal/login-tokens";
import { sendCustomerPortalLoginMail } from "@/lib/mail/customer-portal-mail";

export type PortalLoginRequestResult = {
  sent: true;
  message: string;
};

/** Magic link talebi — e-posta numaralandırma yok; eligibility kapısı. */
export async function handlePortalLoginRequest(params: {
  email: string;
  locale?: string;
  requestIp?: string;
}): Promise<PortalLoginRequestResult> {
  const email = params.email.toLowerCase().trim();
  const customer = await findCustomerByEmail(email);

  if (customer && canUsePasswordReset(customer.passwordHash)) {
    const rawToken = await createPortalLoginToken({
      customerId: customer.id,
      requestIp: params.requestIp,
    });
    const locale =
      params.locale ?? customer.preferredResultLocale ?? "tr";
    await sendCustomerPortalLoginMail({
      to: customer.email,
      locale,
      rawToken,
    });
  }

  return {
    sent: true,
    message: "If registered, a link was sent.",
  };
}
