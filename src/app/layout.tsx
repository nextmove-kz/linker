import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const rubik = localFont({
  src: [
    { path: "./fonts/rubik/Rubik-Light.ttf", weight: "300" },
    { path: "./fonts//rubik/Rubik-Regular.ttf", weight: "400" },
    { path: "./fonts//rubik/Rubik-Medium.ttf", weight: "500" },
    { path: "./fonts//rubik/Rubik-SemiBold.ttf", weight: "600" },
    { path: "./fonts//rubik/Rubik-Bold.ttf", weight: "700" },
    { path: "./fonts//rubik/Rubik-ExtraBold.ttf", weight: "800" },
    { path: "./fonts//rubik/Rubik-Black.ttf", weight: "900" },
  ],
  variable: "--font-rubik",
});

const manrope = localFont({
  src: [
    { path: "./fonts/manrope/Manrope-ExtraLight.ttf", weight: "200" },
    { path: "./fonts/manrope/Manrope-Light.ttf", weight: "300" },
    { path: "./fonts/manrope/Manrope-Regular.ttf", weight: "400" },
    { path: "./fonts/manrope/Manrope-Medium.ttf", weight: "500" },
    { path: "./fonts/manrope/Manrope-SemiBold.ttf", weight: "600" },
    { path: "./fonts/manrope/Manrope-Bold.ttf", weight: "700" },
    { path: "./fonts/manrope/Manrope-ExtraBold.ttf", weight: "800" },
  ],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Linker",
  description: "Professional website for online sales in 15 minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} ${manrope.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
