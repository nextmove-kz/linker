import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";
import { Rubik } from "next/font/google";
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
    { path: "./fonts/static/Rubik-Light.ttf", weight: "300" },
    { path: "./fonts//static/Rubik-Regular.ttf", weight: "400" },
    { path: "./fonts//static/Rubik-Medium.ttf", weight: "500" },
    { path: "./fonts//static/Rubik-SemiBold.ttf", weight: "600" },
    { path: "./fonts//static/Rubik-Bold.ttf", weight: "700" },
    { path: "./fonts//static/Rubik-ExtraBold.ttf", weight: "800" },
    { path: "./fonts//static/Rubik-Black.ttf", weight: "900" },
  ],
  variable: "--font-rubik",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
