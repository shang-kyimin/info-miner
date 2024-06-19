import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ServerQueryProvider from "@/states/server/ServerQueryProvider";
import SearchQueryContextProvider from "@/contexts/searchQuery.context";
import Header from "@/components/shares/Header";
import Footer from "@/components/shares/Footer";


const karla = Karla({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Info Miner",
  description: "Mining the information that interests you. With a simple search by unlocking the power of search results for free!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("max-w-7xl mx-auto min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1", karla.className)}>
        <SearchQueryContextProvider>
          <ServerQueryProvider>
            {/* Header Component */}
            <Header />

            <div className="mx-auto max-w-6xl w-full px-2">
              {children}
            </div>

            {/* Footer Component */}
            <Footer />
          </ServerQueryProvider>
        </SearchQueryContextProvider>
      </body>
    </html>
  );
}
