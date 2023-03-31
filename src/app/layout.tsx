import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import Navbar from "@/components/main-nav";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Lavish Linen | Home",
  description: "Linen for shirts, pants, dresses, and more.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-white font-sans text-stone-900 antialiased dark:bg-stone-900 dark:text-stone-50",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <div>{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
