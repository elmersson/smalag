import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smalag",
  description: "Making the dev life easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.className} bg-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
