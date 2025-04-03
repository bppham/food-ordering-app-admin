"use client";
import Sidebar from "../components/Sidebar/Sidebar";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import { usePathname } from "next/navigation"; 
export default function RootLayout({ children }) {

  const pathname = usePathname();  
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <html lang='en'>        
      <body>
        {!isAuthPage && <Navbar />}
        <div className="admin-container">
          {!isAuthPage && <Sidebar />}
          <div className="admin-container-content">
            { children }
          </div>
        </div>
       
      </body>
    </html>
  );
}