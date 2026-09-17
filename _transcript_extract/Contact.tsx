"use client";

import type { SiteContent } from "@/content/types";
import { trackClientEvent } from "@/lib/analytics-client";
import {
  phoneCountryCodes,
  quoteRequestSchema,
  serviceTypeValues,
} from "@/lib/validation/quote";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type ContactProps = {
  content: SiteContent;
  locale: string;
};

type FormValues = z.input<typeof quoteRequestSchema>;

export function Contact({ content, locale }: ContactProps) {
  const searchParams = useSearchParams();
  const services = Array.isArray(content.services.items)
    ? content.services.items
    : [];
  const options = useMemo(
    () => [
      ...services.map((s) => ({ value: s.slug, label: s.title })),
      { value: "diger" as const, label: content.contact.form.otherService },
    ],
    [services, content.contact.form.otherService],
  );

  const startedAt = useRef<number>(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const preset = searchParams.get("hizmet");
  const presetService =
    preset && (serviceTypeValues as readonly string[]).includes(preset)
      ? (preset as FormValues["serviceType"])
      : undefined;

  const [banner, setBanner] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneCountryCode: "+48",
      phone: "",
      serviceType: presetService ?? "aylik-paket",
      message: "",
      privacyAccepted: false,
      companyWebsite: "",
      formStartedAt: undefined,
    },
  });

  useEffect(() => {
    if (presetService) {
      setValue("serviceType", presetService);
    }
  }, [presetService, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setBanner(null);
    const payload = {
      ...values,
      message: values.message?.trim() ? values.message : undefined,
      companyWebsite: values.companyWebsite ?? "",
      formStartedAt: startedAt.current || Date.now(),
    };

    try {
      const res = await fetch("/api/teklif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        success: boolean;
        error?: { message?: string; code?: string };
      };

      if (res.status === 429) {
        setBanner({
          type: "error",
          message: content.contact.form.rateLimited,
        });
        return;
      }

      if (!res.ok || !json.success) {
        setBanner({
          type: "error",
          message: json.error?.message ?? content.contact.form.error,
        });
        return;
      }

      setBanner({ type: "success", message: content.contact.form.success });
      trackClientEvent("teklif_submit", locale, {
        serviceType: values.serviceType,
      });
      reset({
        fullName: "",
        email: "",
        phoneCountryCode: "+48",
        phone: "",
        serviceType: undefined,
        message: "",
        privacyAccepted: false,
        companyWebsite: "",
      });
      startedAt.current = Date.now();
    } catch {
      setBanner({ type: "error", message: content.contact.form.error });
    }
  });

  return (
    <section id="iletisim" className="scroll-mt-20 bg-pt-surface py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-pt-navy-900">
            {content.contact.title}
          </h2>
          <dl className="mt-8 space-y-4 text-sm text-pt-slate-600">
            <div>
              <dt className="font-semibold text-pt-aws-ink">
                {content.contact.officeLabel}
              </dt>
              <dd>{content.contact.officeValue}</dd>
            </div>
            <div>
              <dt className="font-semibold text-pt-aws-ink">
                {content.contact.emailLabel}
              </dt>
              <dd>
                <a
                  className="text-pt-emerald-600 hover:underline"
                  href={`mailto:${content.contact.emailValue}`}
                >
                  {content.contact.emailValue}
                </a>
              </dd>
            </div>
            {content.contact.phoneValue ? (
              <div>
                <dt className="font-semibold text-pt-aws-ink">
                  {content.contact.phoneLabel}
                </dt>
                <dd>{content.contact.phoneValue}</dd>
              </div>
            ) : null}
            <div>
              <dt className="font-semibold text-pt-aws-ink">
                {content.contact.hoursLabel}
              </dt>
              <dd>{content.contact.hoursValue}</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-pt-border bg-pt-surface p-6 shadow-sm"
          noValidate
        >
          <div className="hidden" aria-hidden>
            <label>
              Company website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("companyWebsite")}
              />
            </label>
          </div>

          <div className="grid gap-4">
            <label className="block text-sm">
              <span className="font-medium text-pt-aws-ink">
                {content.contact.form.fullName}
              </span>
              <input
                className="mt-1 w-full rounded-md border border-pt-border px-3 py-2"
                autoComplete="name"
                {...register("fullName")}
              />
              {errors.fullName ? (
                <ErrorText message={content.contact.form.fieldError} />
              ) : null}
            </label>

            <label className="block text-sm">
              <span className="font-medium text-pt-aws-ink">
                {content.contact.form.email}
              </span>
              <input
                type="email"
                className={inputClassName}
                autoComplete="email"
                {...register("email")}
              />
              {errors.email ? (
                <ErrorText message={content.contact.form.fieldError} />
              ) : null}
            </label>

            <div className="grid grid-cols-[7.5rem_1fr] gap-2">
              <label className="block text-sm">
                <span className="font-medium text-pt-aws-ink">
                  {content.contact.form.phoneCode}
                </span>
                <select
                  className="mt-1 w-full rounded-md border border-pt-border bg-white px-2 py-2"
                  {...register("phoneCountryCode")}
                >
                  {phoneCountryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="font-medium text-pt-aws-ink">
                  {content.contact.form.phone}
                </span>
                <input
                  type="tel"
                  className={inputClassName}
                  autoComplete="tel-national"
                  placeholder="512 345 678"
                  {...register("phone")}
                />
                {errors.phone ? (
                  <ErrorText message={content.contact.form.fieldError} />
                ) : null}
              </label>
            </div>

            <label className="block text-sm">
              <span className="font-medium text-pt-aws-ink">
                {content.contact.form.serviceType}
              </span>
              <select
                className="mt-1 w-full rounded-md border border-pt-border bg-white px-3 py-2"
                defaultValue=""
                {...register("serviceType")}
              >
                <option value="" disabled>
                  —
                </option>
                {options
                  .filter((o) =>
                    (serviceTypeValues as readonly string[]).includes(o.value),
                  )
                  .map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
              </select>
              {errors.serviceType ? (
                <ErrorText message={content.contact.form.fieldError} />
              ) : null}
            </label>

            <p className="rounded-md border border-pt-border bg-pt-bg px-3 py-3 text-sm text-pt-slate-600">
              {content.contact.form.fileNote}{" "}
              <Link
                href={`/${locale}/basvuru`}
                className="font-medium text-pt-emerald-600 hover:underline"
              >
                /{locale}/basvuru
              </Link>
            </p>

            <label className="block text-sm">
              <span className="font-medium text-pt-aws-ink">
                {content.contact.form.message}
              </span>
              <textarea
                rows={4}
                className={inputClassName}
                {...register("message")}
              />
            </label>

            <label className="flex items-start gap-2 text-sm text-pt-slate-600">
              <input type="checkbox" className="mt-1" {...register("privacyAccepted")} />
              <span>
                {content.contact.form.privacy}{" "}
                <Link
                  href={`/${locale}/gizlilik`}
                  className="text-pt-emerald-600 hover:underline"
                >
                  {content.footer.privacy}
                </Link>
              </span>
            </label>
            {errors.privacyAccepted ? (
              <ErrorText message={content.contact.form.fieldError} />
            ) : null}

            {banner ? (
              <p
                className={
                  banner.type === "success"
                    ? "rounded-md bg-pt-emerald-600/10 px-3 py-2 text-sm text-pt-emerald-600"
                    : "rounded-md bg-pt-danger/10 px-3 py-2 text-sm text-pt-danger"
                }
              >
                {banner.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-pt-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-pt-emerald-500 disabled:opacity-60"
            >
              {isSubmitting
                ? content.contact.form.loading
                : content.contact.form.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ErrorText({ message }: { message: string }) {
  return <span className="mt-1 block text-xs text-pt-danger">{message}</span>;
}
