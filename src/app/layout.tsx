import { HeaderLogo } from "@/components/header-logo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
