"use client";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";

import { getEmployee } from "../../api/employee";

const Navbar = () => {
  const [avatar, setAvatar] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Chỉ chạy sau khi component đã mount trên client
    if (typeof window !== "undefined") {
      const employee = JSON.parse(localStorage.getItem("user"));
      setEmployeeId(employee?.id);
    }
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (!employeeId) return;
        const response = await getEmployee(employeeId);
        setAvatar(response.avatar.url);
      } catch (error) {
        console.error("Error get info employee", error);
      }
    };
    fetchInfo();
  }, [employeeId]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link href="/home/" className="link">
          <div className="navbar-left">
            <Image
              src="/assets/logo.png"
              width={45}
              height={45}
              alt="Home Icon"
            />
            <span className="logo">Admin</span>
          </div>
        </Link>
        <div className="navbar-right">
          <img
            src={
              avatar ||
              "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
            }
            alt="Your avatar"
            className="avatar"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {/* ✅ Dropdown menu */}
          {showDropdown && (
            <div className="dropdown-menu">
              <Link href="/account">
                <div className="dropdown-item">Your account</div>
              </Link>
              <div onClick={handleLogout} className="dropdown-item logout">
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
