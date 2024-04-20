import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/footer/Footer";
import {QueryProvider} from "@/lib/queryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReServeCourt",
  description: "Let's reserve some courts!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <QueryProvider>
          <Navbar />
            {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
