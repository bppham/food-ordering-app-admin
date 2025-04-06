import React, { useState } from "react";
import "./ChangePasswordPopup.css";
import { toast } from "react-toastify";

import { resetPassword } from "../../../api/auth";

const ChangePasswordPopup = ({ onClose, employee }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    if (newPassword === "" || confirmPassword === "") {
      toast.error("Vui lòng nhập đủ thông tin");
      return;
    } else if (newPassword.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    } else if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không chính xác");
      return;
    }
    try {
      await resetPassword(newPassword, employee._id);
      toast.success("Đổi mật khẩu thành công!");
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  return (
    <div className="change-password-popup">
      <div className="popup-content">
        <h2>Update your password</h2>
        <div>
          <label>New password:</label>
          <div className="password-wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="button" onClick={toggleNewPasswordVisibility}>
              {showNewPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        <div>
          <label>Confirm your password:</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        <div className="popup-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
