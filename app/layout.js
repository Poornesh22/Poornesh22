import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar.js";
import Table from "@/components/Table.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My-clg-website",
  description: "this website is used for management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        {children}
        </body>
    </html>
  );
}
