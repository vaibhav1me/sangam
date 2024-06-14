import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./context/UserContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sangam",
  description: "A place where hearts connect.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
        </body>
    </html>
  );
}
