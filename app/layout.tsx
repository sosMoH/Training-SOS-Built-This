import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "sosBuiltThis",
  description: "sosBuiltThis is a platform for building and sharing your own projects with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.className}`}
    >
      <body className="min-h-full flex flex-col">
        <header>sosBuiltThis</header>
        {children}
        <footer>sosBuiltThis Inc. All rights Reserved</footer>
      </body>
    </html>
  );
}
