"use client";
import React, { useState, useEffect } from "react";
import "./reset-password.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPasswordWithEmail } from "../../../api/auth";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (!storedEmail) {
      router.push("/auth/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleSubmit = async () => {
    if (password === "" || confirmedPassword === "") {
      toast.error("Please fill in all the information");
    } else if (password.length < 6) {
      toast.error("The password must have at least 6 characters");
    } else if (password !== confirmedPassword) {
      toast.error("Retype password is not correct");
    }
    try {
      await resetPasswordWithEmail(email, password);
      toast.success("Reset password successfully!");
      router.push("/auth/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="reset-password-container">
      <ToastContainer />
      <div className="reset-password-card">
        <h2>Reset password</h2>

        <div className="input-group">
          <label>New password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your password must have 6 characters..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-group">
          <label>Retype password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmedPassword ? "text" : "password"}
              placeholder="Retype your neww password"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="action">
          <button onClick={() => router.push("/auth/login")}>Return</button>
          <button onClick={handleSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default page;
