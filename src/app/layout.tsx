import type { Metadata } from "next";
import '../styles/globals.css'
import { Inter } from 'next/font/google';
import Navbar from "./components/Navbar";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navbar/>
        
        {children}</body>
    </html>
  );
}
