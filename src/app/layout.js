import ErrorHandler from "@/components/ErrorHandler";
import "./globals.css";
import { auth } from "@/auth";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";


export default async function RootLayout({ children }) {

  const session = await auth()
  console.log(session)
 
  return (
    <html lang="en">
      <body>
        <ErrorHandler />
        {!session?.user ? (
          <Login />
        ) : (
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
