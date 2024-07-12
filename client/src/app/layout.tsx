import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "sonner";
import { lazy } from "react";
const poppins = Poppins({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Memory Game",
  description:
    "A simple online memory game that you can play for both desktop and mobile.",
  keywords: [
    "Memory",
    "memory game",
    "game",
    "memory",
    "fun",
    "play",
    "cards",
    "profile",
  ],
};
const Sidebar = lazy(() => import("@/components/Sidebar"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider>
          <div id="bg" className="w-full h-screen overflow-hidden">
            <Sidebar />
            {children}
            <Toaster duration={1500} position="top-center" />
          </div>
        </Provider>
      </body>
    </html>
  );
}
