import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContextProvider";
import NavMenu from "@/components/NavMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <NavMenu/>
          {children}
        </UserProvider>
        </body>
    </html>
  );
}
