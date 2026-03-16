import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Avinash Dasari | AI/ML Engineer & Computer Vision Developer",
  description: "Futuristic portfolio of Avinash Dasari, highlighting work in AI, Computer Vision, Industrial Automation, and Full Stack Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased bg-background text-foreground`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
