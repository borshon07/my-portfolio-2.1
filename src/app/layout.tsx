import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";
import Preloader from "@/components/ui/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Borshon Roy — Creative Web Developer",
  description:
    "Portfolio of Borshon Roy, a web developer focused on building thoughtful, responsive, and user-friendly web experiences.",
  keywords: [
    "Borshon Roy",
    "Web Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Borshon Roy" }],
  creator: "Borshon Roy",
  openGraph: {
    title: "Borshon Roy — Creative Web Developer",
    description:
      "Turning ideas into digital experiences. Thoughtful, responsive, and user-friendly web interfaces.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#141414] text-[#F4F0E8] antialiased selection:bg-[#FF7849] selection:text-[#141414] flex flex-col">
         <Preloader />
        <CustomCursor />
        <Navbar />
        <div className="flex-1 w-full flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
