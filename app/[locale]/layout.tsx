import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google"; // Using Press Start 2P for Retro vibe
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteChangeIndicator } from "@/components/ui/RouteChangeIndicator";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin", "cyrillic"], // Added cyrillic for Russian support
});

export const metadata: Metadata = {
  title: "RedBoxStudio",
  description: "Creating awesome mobile and web games.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ru")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={cn(inter.variable, pressStart.variable)}>
      <body
        className="antialiased min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground flex flex-col"
      >
        <NextIntlClientProvider messages={messages}>
          <RouteChangeIndicator />
          <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
