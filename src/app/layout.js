import ErrorHandler from "@/components/ErrorHandler";
import "./globals.css";
import { auth } from "@/auth";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { FloorNumberProvider } from "@/context/FloorCountContext";

export const metadata = {
  title: "Second Year Allotment | Shatish Dhawan",
  description: "...",
};


export default async function RootLayout({ children }) {

  const session = await auth()
  console.log(session)
 
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-primary overflow-x-hidden">
        <ErrorHandler />
        {!session?.user ? (
          <Login />
        ) : (
          <SessionProvider>
            <Navbar />
            <FloorNumberProvider>{children}</FloorNumberProvider>
          </SessionProvider>
        )}
        <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      </body>
    </html>
  );
}
