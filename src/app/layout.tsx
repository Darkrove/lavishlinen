import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import Navbar from "@/components/main-nav";
import Footer from "@/components/footer";
import { CartProvider } from "@/store/cart";

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
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <div>{children}</div>
              <Footer />
            </div>
          </CartProvider>
        </body>
      </html>
    </>
  );
}
