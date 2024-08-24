import "./globals.css";
import type { Metadata } from "next";
import { Roboto, Silkscreen, Libre_Barcode_39 } from "next/font/google";
import type { ReactNode } from "react";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});
const silkScreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silkscreen",
});
const barcode = Libre_Barcode_39({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-barcode",
});

export const metadata: Metadata = {
  title: "PASSPORT",
  description: "PASSPORT for all",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${silkScreen.variable} ${barcode.variable}`}
      >
        {props.children}
      </body>
    </html>
  );
}
