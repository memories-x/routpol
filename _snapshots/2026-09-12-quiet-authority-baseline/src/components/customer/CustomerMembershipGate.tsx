"use client";

import { cardClassName } from "@/lib/ui-classes";
import { useState } from "react";

type Mode = "login" | "register";
type Entity = "sahis" | "sirket";

type Copy = {
  title: string;
  lead: string;
  tabLogin: string;
  tabRegister: string;
  email: string;
  password: string;
  loginSubmit: string;
  registerSubmit: string;
  forgot: string;
  sendReset: string;
  resetSent: string;
  firstName: string;
  lastName: string;
  company: string;
  individual: string;
  companyTab: string;
  busy: string;
};

function copy(locale: string): Copy {
  if (locale === "pl") {
    return {
      title: "Wasze konto",
      lead: "E-mail i hasło. Indywidualne lub firmowe — sprawy zostają na koncie.",
      tabLogin: "Logowanie",
      tabRegister: "Rejestracja",
      email: "E-mail",
      password: "Hasło",
      loginSubmit: "Zaloguj się",
      registerSubmit: "Utwórz konto",
      forgot: "Nie pamiętam hasła",
      sendReset: "Wyślij link resetu",
      resetSent: "Jeśli konto istnieje — wysłaliśmy link (15 min).",
      firstName: "Imię",
      lastName: "Nazwisko",
      company: "Nazwa firmy",
      individual: "Osoba",
      companyTab: "Firma",
      busy: "…",
    };
  }
  if (locale === "en") {
    return {
      title: "Your account",
      lead: "Email and password. Individual or company — your jobs stay on this page.",
      tabLogin: "Sign in",
      tabRegister: "Sign up",
      email: "Email",
      password: "Password",
      loginSubmit: "Sign in",
      registerSubmit: "Create account",
      forgot: "Forgot password",
      sendReset: "Send reset link",
      resetSent: "If an account exists, a 15-minute link was sent.",
      firstName: "First name",
      lastName: "Last name",
      company: "Company name",
      individual: "Individual",
      companyTab: "Company",
      busy: "…",
    };
  }
  return {
    title: "Hesabınız",
    lead: "E-posta ve şifre. Bireysel veya kurumsal — işleriniz bu sayfada kalır.",
    tabLogin: "Giriş",
    tabRegister: "Üye ol",
    email: "E-posta",
    password: "Şifre",
    loginSubmit: "Giriş yap",
    registerSubmit: "Üye ol",
    forgot: "Şifremi unuttum",
    sendReset: "Sıfırlama linki gönder",
    resetSent: "Hesap varsa 15 dk’lık link gitti.",
    firstName: "Ad",
    lastName: "Soyad",
    company: "Şirket adı",
    individual: "Bireysel",
    companyTab: "Kurumsal",
    busy: "…",
  };
}

type Props = {
  locale: string;
  onAuthed: () => Promise<void>;
};

export function CustomerMembershipGate({ locale, onAuthed }: Props) {
  const L = copy(locale);
  const [mode, setMode] = useState<Mode>("login");
  const [entity, setEntity] = useState<Entity>("sahis");
  const [forgot, setForgot] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch("/api/customer/login/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (json.success) await onAuthed();
      else setError(json.error?.message ?? "Error");
    } catch {
      setError("Error");
    } finally {
      setBusy(false);
    }
  }

  async function register(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch("/api/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entityType: entity,
          email,
          password,
          locale,
          firstName: entity === "sahis" ? firstName : undefined,
          lastName: entity === "sahis" ? lastName : undefined,
          companyName: entity === "sirket" ? companyName : undefined,
        }),
      });
      const json = await res.json();
      if (json.success) await onAuthed();
      else setError(json.error?.message ?? "Error");
    } catch {
      setError("Error");
    } finally {
      setBusy(false);
    }
  }

  async function requestReset(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/customer/login/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const json = await res.json();
      if (json.success) setMessage(L.resetSent);
      else setError(json.error?.message ?? "Error");
    } catch {
      setError("Error");
    } finally {
      setBusy(false);
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-md border border-pt-border px-3 py-2";
  const tabClass = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm font-semibold ${
      active
        ? "bg-pt-emerald-600 text-white"
        : "border border-pt-border text-pt-navy-800 hover:bg-pt-bg"
    }`;

  return (
    <div className={`max-w-lg ${cardClassName}`}>
      <h1 className="font-display text-2xl text-pt-navy-900 md:text-3xl">
        {L.title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-pt-slate-600">{L.lead}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className={tabClass(mode === "login")}
          onClick={() => {
            setMode("login");
            setForgot(false);
            setError(null);
          }}
        >
          {L.tabLogin}
        </button>
        <button
          type="button"
          className={tabClass(mode === "register")}
          onClick={() => {
            setMode("register");
            setForgot(false);
            setError(null);
          }}
        >
          {L.tabRegister}
        </button>
      </div>

      {mode === "login" && !forgot ? (
        <form onSubmit={(e) => void login(e)} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-pt-aws-ink">
            {L.email}
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="block text-sm font-medium text-pt-aws-ink">
            {L.password}
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
              minLength={1}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-pt-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pt-emerald-500 disabled:opacity-60"
          >
            {busy ? L.busy : L.loginSubmit}
          </button>
          <button
            type="button"
            className="ml-3 text-sm text-pt-slate-600 underline"
            onClick={() => {
              setForgot(true);
              setError(null);
            }}
          >
            {L.forgot}
          </button>
        </form>
      ) : null}

      {mode === "login" && forgot ? (
        <form onSubmit={(e) => void requestReset(e)} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-pt-aws-ink">
            {L.email}
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-pt-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pt-emerald-500 disabled:opacity-60"
          >
            {busy ? L.busy : L.sendReset}
          </button>
          <button
            type="button"
            className="ml-3 text-sm text-pt-slate-600 underline"
            onClick={() => setForgot(false)}
          >
            {L.tabLogin}
          </button>
        </form>
      ) : null}

      {mode === "register" ? (
        <form onSubmit={(e) => void register(e)} className="mt-8 space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={tabClass(entity === "sahis")}
              onClick={() => setEntity("sahis")}
            >
              {L.individual}
            </button>
            <button
              type="button"
              className={tabClass(entity === "sirket")}
              onClick={() => setEntity("sirket")}
            >
              {L.companyTab}
            </button>
          </div>
          {entity === "sahis" ? (
            <>
              <label className="block text-sm font-medium text-pt-aws-ink">
                {L.firstName}
                <input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={fieldClass}
                  autoComplete="given-name"
                />
              </label>
              <label className="block text-sm font-medium text-pt-aws-ink">
                {L.lastName}
                <input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={fieldClass}
                  autoComplete="family-name"
                />
              </label>
            </>
          ) : (
            <label className="block text-sm font-medium text-pt-aws-ink">
              {L.company}
              <input
                required
                minLength={2}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={fieldClass}
                autoComplete="organization"
              />
            </label>
          )}
          <label className="block text-sm font-medium text-pt-aws-ink">
            {L.email}
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="block text-sm font-medium text-pt-aws-ink">
            {L.password}
            <input
              type="password"
              required
              minLength={10}
              maxLength={72}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-pt-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pt-emerald-500 disabled:opacity-60"
          >
            {busy ? L.busy : L.registerSubmit}
          </button>
        </form>
      ) : null}

      {message ? (
        <p className="mt-4 text-sm text-pt-emerald-700">{message}</p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
