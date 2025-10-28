import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cozy Corner",
  description: "Stylish products for your home and interior",
  openGraph: {
    type: "website",
    url: "https://online-shop-chi-flame.vercel.app",
    title: "Cozy Corner",
    description: "Stylish products for your home and interior",
    images: [
      {
        url: "https://online-shop-chi-flame.vercel.app/img/living-room.webp",
        width: 1200,
        height: 630,
        alt: "Cozy Corner - Stylish home products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    title: "Cozy Corner",
    description: "Stylish products for your home and interior",
    images: ["https://online-shop-chi-flame.vercel.app/img/living-room.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
