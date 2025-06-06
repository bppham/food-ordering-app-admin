"use client";
import React, { useRef, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./verify-otp.css";
import { checkOTP, forgetPassword } from "../../../api/auth";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const inputsRef = useRef([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [expired, setExpired] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (!storedEmail) {
      router.push("/auth/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d$/.test(value)) {
      e.target.value = "";
      return;
    }

    // Cập nhật giá trị OTP
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Di chuyển sang ô tiếp theo nếu có
    if (inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !e.target.value &&
      inputsRef.current[index - 1]
    ) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Gửi OTP lên backend để xác thực
  const handleVerifyOTP = async () => {
    if (expired) {
      toast.error("OTP expired, please click resend OTP.");
      return;
    }

    const enteredOTP = otp.join(""); // Ghép 6 số thành một chuỗi
    if (enteredOTP.length !== 6) {
      toast.error("Please fill all the verify codes.");
      return;
    }

    try {
      setLoading(true);
      const response = await checkOTP(email, enteredOTP); // Gọi API
      toast.success(
        "Verify successfully, processing to reset password page"
      );
      setTimeout(() => {
        router.push("/auth/reset-password"); // Chuyển hướng đến trang đặt lại mật khẩu
      }, 1500);
    } catch (error) {
      toast.error(error.message || "The OTP is incorrected or expired");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    try {
      const response = await forgetPassword(email);
      toast.success("Resend the code successfully!");

      // Reset thời gian đếm ngược và trạng thái hết hạn
      setTimeLeft(120);
      setExpired(false);
      setOtp(["", "", "", "", "", ""]); // Reset các ô nhập OTP
      inputsRef.current[0]?.focus(); // Đưa con trỏ về ô đầu tiên
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Resend the code failed!");
    }
  };

  return (
    <div className="verify-otp-container">
      <ToastContainer />
      <div className="verify-otp-card">
        <h3>Your OTP</h3>
        <p>(Check your email)</p>

        <div className="otp-input-group">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              pattern="[0-9]{1}"
              className="otp-input"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={expired}
            />
          ))}
        </div>

        <div className="countdown-timer">
          <p>
            OTP expire in: <span>{formatTime(timeLeft)}</span>
          </p>
        </div>

        <button
          className="verify-btn"
          onClick={handleVerifyOTP}
          disabled={expired || loading}
        >
          {loading
            ? "Processing..."
            : expired
            ? "OTP expired"
            : "Confirm"}
        </button>

        <div className="resend-options">
          <p>Don't see the OTP code?</p>
          <a onClick={handleSendOTP}>Resend</a> |{" "}
          <a href="/auth/forgot-password">Change email</a>
        </div>
      </div>
    </div>
  );
};

export default Page;
