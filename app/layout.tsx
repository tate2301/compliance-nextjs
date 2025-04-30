import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mercury Design System",
  description:
    "A modern design system built with Radix Colors and Tailwind CSS",
};

interface SubdomainLayoutProps {
  params: {
    subdomain: string;
  };
  children: React.ReactNode;
}

export default function RootLayout({ params, children }: SubdomainLayoutProps) {
  const subdomain = params?.subdomain;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-slate-3 min-h-screen text-foreground",
          ibmPlexSans.variable,
          ibmPlexSans.className
        )}
      >
        <Providers>
          <main className="h-full" data-subdomain={subdomain}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
