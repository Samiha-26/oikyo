import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Oikyo (ঐক্য) | Bangladesh Grassroots Social Development Platform",
  description: "A community-driven event management platform to create, join, and track grassroots social service events across Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="oikyo-light"
      className={`${inter.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-base-100 text-base-content">
        <Toaster position="top-center" />
        <div className="flex-1 w-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
