import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pablo Rincon — Colombian Developer & Builder",
  description:
    "Personal portfolio of Pablo Rincon. Colombian-born developer and builder based in the U.S. Building things that matter.",
  openGraph: {
    title: "Pablo Rincon",
    description: "Colombian Developer & Builder based in the U.S.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable}`}
      style={{ backgroundColor: "#080808" }}
    >
      <body className="min-h-screen bg-bg text-text antialiased overflow-x-hidden">
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
