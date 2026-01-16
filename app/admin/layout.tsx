import { Inter, Press_Start_2P } from "next/font/google"; // Using Press Start 2P for Retro vibe
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { RouteChangeIndicator } from "@/components/ui/RouteChangeIndicator";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
});

export const metadata = {
  title: "RedBoxStudio Admin",
  description: "Secure Admin Terminal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, pressStart.variable)}>
      <body className="antialiased min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-primary-foreground flex flex-col font-mono">
          <RouteChangeIndicator />
          <main className="flex-1">
            {children}
          </main>
      </body>
    </html>
  );
}
