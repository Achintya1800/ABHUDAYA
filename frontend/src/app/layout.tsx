import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ChatbotWidget from "@/components/chatbotWidget";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABHUDAYA- Unified Mobile Application for New-age Governance",
  description: "Access all government services through a single platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <ChatbotWidget/>
      </body>
    </html>
  );
}