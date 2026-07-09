import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { BackgroundLullaby } from "@/components/BackgroundLullaby";
import { siteContent } from "@/lib/content";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteContent.metaTitle,
  description: siteContent.metaDescription,
  openGraph: {
    title: siteContent.metaTitle,
    description: siteContent.metaDescription,
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full" suppressHydrationWarning>
      <body
        className={`${cairo.variable} min-h-full font-sans antialiased`}
        suppressHydrationWarning
      >
        <BackgroundLullaby />
        {children}
      </body>
    </html>
  );
}
