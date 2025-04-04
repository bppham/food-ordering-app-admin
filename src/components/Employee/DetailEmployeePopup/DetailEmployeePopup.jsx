import React, { useState } from "react";
import "./DetailEmployeePopup.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const page = ({ showDetailPopup, employee, setShowDetailPopup }) => {
  const [loading, setLoading] = useState(false);

  const [previewAvatar, setPreviewAvatar] = useState(employee.avatar.url);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const roles = [
    { value: "ADMIN", label: "Admin" },
    { value: "SHIPPER", label: "Manage Shippers" },
    { value: "STORE", label: "Manage Stores" },
    { value: "EMPLOYEE", label: "Manage Employees" },
  ];

  return (
    showDetailPopup && (
      <div className="detail-employee-model-overplay">
        <div className="model">
          <h3>Detail an employee</h3>
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
            </div>
            <div className="right">
              <div className="row">
                <div className="item">
                  <label>Full name:</label>
                  <input
                    type="text"
                    placeholder="Input employee's name ..."
                    value={employee.name}
                    readOnly
                  />
                </div>
                <div className="item">
                  <label>Email:</label>
                  <input
                    type="text"
                    placeholder="Input employee's email ..."
                    value={employee.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="item">
                  <label>Phone number:</label>
                  <input
                    type="text"
                    placeholder="Input employee's phone number ..."
                    value={employee.phonenumber}
                    readOnly
                  />
                </div>
                <div className="item">
                  <label>Gender:</label>
                  <input
                    type="text"
                    value={
                      employee.gender === "male"
                        ? "Male"
                        : employee.gender === "female"
                        ? "Female"
                        : "Other"
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                <div className="item">
                  <label>Access control:</label>
                  <div className="checkbox-roles">
                    {roles.map((role) => (
                      <div key={role.value} className="role-container">
                        <label>
                          <input
                            type="checkbox"
                            checked={employee.role.includes(role.value)}
                          />
                          {role.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="model-buttons">
            <button onClick={() => setShowDetailPopup(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default page;
