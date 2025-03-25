import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/Footer";
import TanStackProvider from "@/providers/TanStackProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "sazShop",
  description: "sazshop e-commerce",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <div className="h-[100dvh] flex flex-col">
            <div className="flex-1">
              <TanStackProvider>
                {children}
              </TanStackProvider>
            </div>

            <Footer />
          </div>

        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
