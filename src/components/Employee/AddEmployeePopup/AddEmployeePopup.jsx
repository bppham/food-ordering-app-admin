import { useState } from "react";
import "./AddEmployeePopup.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { addEmployee, uploadAvatarImage } from "../../../api/employee";

const AddEmployeePopup = ({ showAddPopup, setShowAddPopup, onEmployeeAdd }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phonenumber: "",
    gender: "",
    role: [],
    password: "",
    avatar: null,
  });

  const roles = [
    { value: "ADMIN", label: "Admin" },
    { value: "SHIPPER", label: "Manage Shippers" },
    { value: "STORE", label: "Manage Stores" },
    { value: "EMPLOYEE", label: "Manage Employees" },
  ];

  const handleRoleChange = (role) => {
    setEmployee((prev) => {
      const newRoles = prev.role.includes(role)
        ? prev.role.filter((r) => r !== role)
        : [...prev.role, role]; // Thêm hoặc xóa quyền
      return { ...prev, role: newRoles };
    });
  };

  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (employee.name === "") {
      toast.error("Name is required");
      return;
    }

    if (employee.email === "") {
      toast.error("Email is required");
      return;
    }

    if (!/^\d+$/.test(employee.phonenumber) || employee.phonenumber < 10) {
      toast.error("Phone number invalid");
      return;
    }
    if (employee.gender === "") {
      toast.error("Gender is required");
      return;
    }

    if (employee.role === "") {
      toast.error("Role is required");
      return;
    }

    try {
      let urlAvatar =
        "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png";
      if (employee.avatar) {
        console.log("Call api upload img");
        urlAvatar = await uploadAvatarImage(employee.avatar);
      }
      console.log(urlAvatar);

      await addEmployee(employee, urlAvatar);
      Swal.fire("Success!", "Employee has been added!", "success").then(() => {
        setShowAddPopup(false);
        if (onEmployeeAdd) {
          onEmployeeAdd();
        }
      });
    } catch (error) {
      console.log("❌ Error add employee:", error);
      toast.error(error.response?.data || "Failed Add Employee!");
    }
  };

  return (
    showAddPopup && (
      <div className="add-employee-model-overplay">
        <div className="model">
          <h3>Add an employee</h3>
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
                style={{ display: "none" }} // Ẩn input file
              />
              <button
                type="button"
                onClick={() => document.getElementById("avatarInput").click()}
              >
                Choose Image
              </button>
            </div>
            <div className="right">
              <div className="row">
                <div className="item">
                  <label>Full name:</label>
                  <input
                    type="text"
                    placeholder="Input employee's name ..."
                    value={employee.name}
                    onChange={(e) =>
                      setEmployee((prev) => ({
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
                    value={employee.email}
                    onChange={(e) =>
                      setEmployee((prev) => ({
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
                  <label>Phone number</label>
                  <input
                    type="text"
                    placeholder="Input employee's phone number ..."
                    value={employee.phonenumber}
                    onChange={(e) =>
                      setEmployee((prev) => ({
                        ...prev,
                        phonenumber: e.target.value,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="item">
                  <label>Gender:</label>
                  <select
                    value={employee.gender}
                    onChange={(e) =>
                      setEmployee((prev) => ({
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
                            onChange={() => handleRoleChange(role.value)}
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
            <button onClick={() => setShowAddPopup(false)}>Cancel</button>
            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEmployeePopup;
