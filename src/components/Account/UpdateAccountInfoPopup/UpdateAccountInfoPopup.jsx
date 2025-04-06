import React, { useState } from "react";
import "./UpdateAccountInfoPopup.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { updateEmployee, uploadAvatarImage } from "../../../api/employee";

const UpdateAccountInfoPopup = ({
  showUpdatePopup,
  employee,
  setShowUpdatePopup,
  onEmployeeUpdated,
}) => {
  const [employeeInfo, setEmployeeInfo] = useState({
    name: employee.name,
    email: employee.email,
    phonenumber: employee.phonenumber,
    gender: employee.gender,
    role: employee.role || [],
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(employee.avatar.url);

  const roles = [
    { value: "ADMIN", label: "Admin" },
    { value: "SHIPPER", label: "Manage Shippers" },
    { value: "STORE", label: "Manage Stores" },
    { value: "EMPLOYEE", label: "Manage Employees" },
  ];

  const handleRoleToggle = (role) => {
    setEmployeeInfo((prev) => {
      const updatedRoles = prev.role.includes(role)
        ? prev.role.filter((r) => r !== role)
        : [...prev.role, role];
      return { ...prev, role: updatedRoles };
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeInfo((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handelUpdate = async (e) => {
    e.preventDefault();

    if (employeeInfo.name === "") {
      toast.error("Name is required");
      return;
    }

    if (employeeInfo.email === "") {
      toast.error("Email is required");
      return;
    }

    if (
      !/^\d+$/.test(employeeInfo.phonenumber) ||
      employeeInfo.phonenumber < 10
    ) {
      toast.error("Phone number invalid");
      return;
    }
    if (employeeInfo.gender === "") {
      toast.error("Gender is required");
      return;
    }

    if (employeeInfo.role === "") {
      toast.error("Role is required");
      return;
    }

    try {
      let urlAvatar = employee.avatar.url;
      if (employeeInfo.avatar) {
        console.log("Call api upload img");
        urlAvatar = await uploadAvatarImage(employeeInfo.avatar);
      }
      console.log(urlAvatar);
      console.log(employee._id);

      await updateEmployee(employee._id, employeeInfo, urlAvatar);
      Swal.fire("Success!", "Employee has been updated!", "success").then(
        () => {
          setShowUpdatePopup(false);
          if (onEmployeeUpdated) {
            onEmployeeUpdated();
          }
        }
      );
    } catch (error) {
      console.log("❌ Error update employee:", error);
      toast.error(error.response?.data || "Failed update Employee!");
    }
  };

  return (
    true && (
      <div className="update-employee-model-overplay">
        <div className="model">
          <h3>Update an employee</h3>
          <div className="info-row">
            <div className="left">
              <img
                src={
                  previewAvatar ||
                  "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
                }
                alt="Avatar Preview"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                id="avatarInput"
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => document.getElementById("avatarInput").click()}
              >
                Choose image
              </button>
            </div>
            <div className="right">
              <div className="row">
                <div className="item">
                  <label>Full name:</label>
                  <input
                    type="text"
                    placeholder="Input employee's name ..."
                    value={employeeInfo.name}
                    onChange={(e) =>
                      setEmployeeInfo((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="item">
                  <label>Email:</label>
                  <input
                    type="text"
                    placeholder="Input employee's email ..."
                    value={employeeInfo.email}
                    onChange={(e) =>
                      setEmployeeInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="item">
                  <label>Phone number:</label>
                  <input
                    type="text"
                    placeholder="Input employee's phone number ..."
                    value={employeeInfo.phonenumber}
                    onChange={(e) =>
                      setEmployeeInfo((prev) => ({
                        ...prev,
                        phonenumber: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="item">
                  <label>Gender:</label>
                  <select
                    value={employeeInfo.gender}
                    onChange={(e) =>
                      setEmployeeInfo((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="">-- Choose Gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="model-buttons">
            <button onClick={() => setShowUpdatePopup(false)}>Cancel</button>
            <button disabled={loading} onClick={handelUpdate}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateAccountInfoPopup;
