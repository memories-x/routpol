import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      "http://localhost:3000",
  ),
  title: {
    default: "POL-TURK | Resmi yazılarınız dilinizde — süreciniz takipte",
    template: "%s | POL-TURK",
  },
  description:
    "Kurum evrakını PL / EN / TR açıklarız; ne istendi, son tarih ve sıradaki adım net olur. Hukuki süreci Polonyalı avukat ortakları yürütür — biz avukat değiliz.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/mark.svg" }],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "POL-TURK",
    title: "POL-TURK | Resmi yazılarınız dilinizde — süreciniz takipte",
    description:
      "Resmi yazıyı anlatırız, süreci takip ederiz. Hukuk bürosu değiliz — avukat ortağı yürütür.",
    images: [{ url: "/brand/mark.svg", width: 48, height: 48, alt: "POL-TURK" }],
  },
  twitter: {
    card: "summary",
    title: "POL-TURK",
    description:
      "Resmi yazıyı dilinizde açıklarız, sürecinizi takip ederiz. Hukuk avukat ortağında.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
