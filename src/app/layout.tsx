import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Ganesh Kharel | Creative Portfolio",
  description:
    "Premium portfolio of Ganesh Kharel, graphic designer, video editor, motion designer, and creative digital marketer.",
  openGraph: {
    title: "Ganesh Kharel | Make it clean. Make it convert.",
    description:
      "Clean, modern, conversion-focused visuals for brands, creators, and businesses.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
