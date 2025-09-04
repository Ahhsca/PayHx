import { HeaderLogo } from "@/components/header-logo";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayHx",
  description: "Real salaries real people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="container mx-auto py-5 px-2 sm:px-0">
            <div className="flex items-center justify-between">
              <HeaderLogo />
              <Navigation />
            </div>
          </div>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
