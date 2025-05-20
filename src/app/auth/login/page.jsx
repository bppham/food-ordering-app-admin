"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

import Swal from "sweetalert2";

import { login } from "../../../api/auth";
const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: data._id, role: data.role })
      );

      toast.success("Success Login !", {
        position: "top-right",
        closeButton: false,
      });
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: err.message || "Email or password is not correct.",
      });
      setError(err.message);
    }
  };

  return (
    <>
    <ToastContainer/>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-input">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Your account password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="forgot-password">
              <a href="/auth/forgot-password">Forget pasword?</a>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
