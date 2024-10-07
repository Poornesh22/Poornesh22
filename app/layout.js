import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar.js";
import Table from "@/components/Table.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My-clg-website",
  description: "this website is used for management",
};

export const generateViewport = () => ({
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        {children}
        <footer className="bg-cyan-950 fixed w-full bottom-0 text-white shadow-inner shadow-black">
          <ul className="flex justify-around p-1 text-[10px] sm:text-base font-serif">
            <li>Copyright &copy; Poornesh Mishra</li>
            <li> poorneshmishra10@gmail.com</li>
          </ul>
        </footer>
      </body>
    </html>
  );
}