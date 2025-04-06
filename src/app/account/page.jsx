"use client";
import React, { useEffect, useState } from "react";
import "./account.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChangePasswordPopup from "../../components/Account/ChangePasswordPopup/ChangePasswordPopup";
import UpdateAccountInfoPopup from "../../components/Account/UpdateAccountInfoPopup/UpdateAccountInfoPopup";

import { getEmployee } from "../../api/employee";
import { verifyOldPassword } from "../../api/auth";

const page = () => {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const employeeId = user?.id;

  const [oldPassword, setOldPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const clearOldPassword = () => {
    setOldPassword("");
  };
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      if (!employeeId) {
        console.error("Cannot found employee id");
        return;
      }

      const response = await getEmployee(employeeId);
      console.log(response);
      setEmployee(response);
    } catch (error) {
      console.error("Error get info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Change personal info
  const [showChangeInfoPopup, setShowChangeInfoPopup] = useState(false);

  const openUpdatePopup = () => {
    setShowChangeInfoPopup(true);
  };

  const handleChangeInfoClose = () => {
    setShowChangeInfoPopup(false);
    clearOldPassword();
  };

  // Change password
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

  const handleChangePasswordClose = () => {
    setShowChangePasswordPopup(false);
  };

  const handleVerifiedOldPassword = async () => {
    try {
      await verifyOldPassword(oldPassword);
      toast.success("Ready to change password!");
      setIsVerified(true);
      setShowChangePasswordPopup(true);
      clearOldPassword();
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading) {
    return <p className="loading-text">Loading ...</p>;
  }

  return (
    <div className="personal-info">
      <h1>Your account</h1>
      <div className="personal-info-container">
        <div className="personal-info-left">
          <div className="title">Avatar</div>
          <img src={employee.avatar.url} alt="" />
        </div>
        <div className="personal-info-right">
          <div className="title">Information</div>
          <div className="info-container">
            <div className="info-item">
              <span className="heading">Id: </span>
              <span className="info-detail">{employee._id}</span>
            </div>

            <div className="info-item">
              <span className="heading">Full name: </span>
              <span className="info-detail">{employee.name}</span>
            </div>

            <div className="info-item">
              <span className="heading">Email: </span>
              <span className="info-detail">{employee.email}</span>
            </div>

            <div className="info-item">
              <span className="heading">Gender: </span>
              <span className="info-detail">{employee.gender}</span>
            </div>

            <div className="info-item">
              <span className="heading">Phone number: </span>
              <span className="info-detail">{employee.phonenumber}</span>
            </div>
          </div>
          <div className="action">
            <button onClick={() => openUpdatePopup()}>Update</button>
          </div>
        </div>
      </div>
      <div className="change-password-container">
        <div className="title">Change Account Password</div>
        <div className="old-password-container">
          <span>Old Password:</span>
          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Your old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <div className="action">
            <button onClick={handleVerifiedOldPassword}>Verify</button>
          </div>
        </div>
      </div>

      {/* Show popup */}
      {showChangePasswordPopup && (
        <ChangePasswordPopup
          onClose={handleChangePasswordClose}
          employee={employee}
        />
      )}

      {showChangeInfoPopup && (
        <UpdateAccountInfoPopup
          onClose={handleChangeInfoClose}
          employee={employee}
          setShowUpdatePopup={setShowChangeInfoPopup}
          onEmployeeUpdated={fetchInfo}
        />
      )}
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default page;
