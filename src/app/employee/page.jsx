"use client";
import React, { useEffect, useState } from "react";
import "./employee.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import {
  getAllEmployees,
  blockEmployee,
  approveEmployee,
  deleteEmployee,
} from "../../api/employee";

import AddEmployeePopup from "../../components/Employee/AddEmployeePopup/AddEmployeePopup";
import UpdateEmployeePopup from "../../components/Employee/UpdateEmployeePopup/UpdateEmployeePopup";
import DetailEmployeePopup from "../../components/Employee/DetailEmployeePopup/DetailEmployeePopup";

const page = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEmployees();
    console.log(employees);
  }, []);

  useEffect(() => {
    handleSearchAndSort();
  }, [searchTerm, sortOrder, employees]);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setError(null);
      setEmployees(data);
    } catch (error) {
      console.error(
        "Lỗi khi lấy danh sách nhân viên:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleSearchAndSort = () => {
    let updatedList = [...employees];

    // Search
    if (searchTerm) {
      updatedList = updatedList.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "id-asc") {
      updatedList.sort((a, b) => a._id.localeCompare(b._id));
    } else if (sortOrder === "id-desc") {
      updatedList.sort((a, b) => b._id.localeCompare(a._id));
    } else if (sortOrder === "name-asc") {
      updatedList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      updatedList.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredEmployees(updatedList);
    setCurrentPage(1);
  };

  // Add a food type
  const [showAddPopup, setShowAddPopup] = useState(false);

  // Update a food type
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [seletedEmployee, setSeletedEmployee] = useState(null);
  const openUpdatePopup = (employee) => {
    setSeletedEmployee(employee);
    setShowUpdatePopup(true);
  };

  // Handel Detail
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const openDetailPopup = (employee) => {
    setSeletedEmployee(employee);
    setShowDetailPopup(true);
  };

  // BLOCK SHIPPER
  const toggleEmployeeStatus = async (id, status) => {
    try {
      let response;
      if (status === "BLOCKED") {
        response = await approveEmployee(id);
      } else {
        response = await blockEmployee(id);
      }
      console.log(response);
      fetchEmployees();
    } catch (error) {
      console.error(
        "Lỗi khi lấy danh sách nhân viên:",
        error.response?.data?.message || error.message
      );
      toast.error(error);
      setError(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!id) {
      return toast.error("Employee ID is missing!");
    }

    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await deleteEmployee(id);

      Swal.fire({
        icon: "success",
        title: "Employee deleted successfully!",
      });

      setEmployees((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Failed to delete employee");
    } finally {
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="employee">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Employee</h1>
      {error ? (
        <div> {error} </div>
      ) : employees.length > 0 ? (
        <>
          <div className="employee-list-header">
            <div className="title">
              Employee list
              <div className="action">
                <input
                  type="text"
                  placeholder="Input employee name ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="">Sort by</option>
                  <option value="id-asc">By Id: Ascending</option>
                  <option value="id-desc">By Id: Descending</option>
                  <option value="name-asc">By name: A to Z</option>
                  <option value="name-desc">By name: Z to A</option>
                </select>
              </div>
            </div>
            <div className="add">
              <button onClick={() => setShowAddPopup(true)}>
                Add an employee
              </button>
            </div>
          </div>
          <div className="employee-list-container">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee, index) => (
                  <tr key={employee._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="row-title">
                        <img src={employee.avatar.url} alt="" />
                        {employee.name}
                      </div>
                    </td>
                    <td>{employee.email}</td>
                    <td
                      className={
                        employee.status === "APPROVED"
                          ? "status-approved"
                          : "status-blocked"
                      }
                    >
                      {employee.status}
                    </td>
                    <td>
                      <div className="action">
                        <img
                          src="/assets/admin-icons/info.png"
                          onClick={() => openDetailPopup(employee)}
                        />
                        <img
                          src="/assets/admin-icons/role.png"
                          onClick={() => openUpdatePopup(employee)}
                        />
                        <img
                          src={
                            employee.status === "APPROVED"
                              ? "/assets/admin-icons/block.png"
                              : "/assets/admin-icons/approve.png"
                          }
                          alt={
                            employee.status === "APPROVED" ? "Block" : "Approve"
                          }
                          width="20"
                          height="20"
                          onClick={() =>
                            toggleEmployeeStatus(employee._id, employee.status)
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <img src="/assets/admin-icons/delete.png" onClick={() => handleDelete(employee._id)}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              {currentPage} / {Math.ceil(employees.length / itemsPerPage)}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(employees.length / itemsPerPage))
                )
              }
              disabled={
                currentPage === Math.ceil(employees.length / itemsPerPage)
              }
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Không có nhân viên nào để hiển thị.</p>
      )}

      {showAddPopup && (
        <AddEmployeePopup
          showAddPopup={showAddPopup}
          setShowAddPopup={setShowAddPopup}
          onEmployeeAdd={fetchEmployees}
        />
      )}

      {showUpdatePopup && (
        <UpdateEmployeePopup
          showUpdatePopup={showUpdatePopup}
          employee={seletedEmployee}
          setShowUpdatePopup={setShowUpdatePopup}
          onEmployeeUpdated={fetchEmployees}
        />
      )}

      {showDetailPopup && (
        <DetailEmployeePopup
          showDetailPopup={showDetailPopup}
          employee={seletedEmployee}
          setShowDetailPopup={setShowDetailPopup}
        />
      )}
    </div>
  );
};

export default page;
