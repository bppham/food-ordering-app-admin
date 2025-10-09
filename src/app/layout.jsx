"use client";

import Sidebar from "../components/Sidebar/Sidebar";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import { usePathname } from "next/navigation";
import RequireAuth from "../components/RequireAuth";
import { useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  // ✅ State toggle sidebar
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  const content = (
    <>
      {!isAuthPage && <Navbar toggleSidebar={toggleSidebar} />}
      <div
        className={`flex ${isAuthPage ? "h-screen" : "h-[calc(100vh-60px)]"}`}
      >
        {/* Sidebar */}
        {!isAuthPage && <Sidebar isOpen={isOpenSidebar} />}

        {/* Nội dung chính */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Overlay chỉ hiện ở mobile */}
      {isOpenSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpenSidebar(false)}
        ></div>
      )}
    </>
  );

  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        {isAuthPage ? content : <RequireAuth>{content}</RequireAuth>}
      </body>
    </html>
  );
}
