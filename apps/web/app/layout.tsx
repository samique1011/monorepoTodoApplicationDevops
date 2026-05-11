import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./Providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
