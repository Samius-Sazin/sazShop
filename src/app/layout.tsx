import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/providers/theme-provider";


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
              {children}
            </div>

            <Footer />
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}
