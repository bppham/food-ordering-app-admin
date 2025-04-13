"use client";
import "./shipper.css";
import React, { useEffect, useState } from "react";
import {
  getCurrentShippers,
  approveShipper,
  blockShipper,
  deleteShipper,
} from "../../../api/shipper";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DetailShipperPopup from "../../../components/Shipper/DetailShipperPopup/DetailShipperPopup";

const page = () => {
  const [shippers, setShippers] = useState([]);
  const [filteredShippers, setFilteredShippers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchShippers();
  }, []);

  useEffect(() => {
    handleSearchAndSort();
  }, [searchTerm, sortOrder, shippers]);

  const fetchShippers = async () => {
    try {
      const data = await getCurrentShippers();
      setShippers(data);
    } catch (error) {
      console.error("Error fetch data shippers: ", error);
    }
  };

  const handleSearchAndSort = () => {
    let updatedList = [...shippers];

    // Search
    if (searchTerm) {
      updatedList = updatedList.filter((shipper) =>
        shipper.name.toLowerCase().includes(searchTerm.toLowerCase())
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

    setFilteredShippers(updatedList);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm/sắp xếp
  };

  // BLOCK SHIPPER
  const toggleShipperStatus = async (id, status) => {
    try {
      let response;
      if (status === "BLOCKED") {
        response = await approveShipper(id);
      } else {
        response = await blockShipper(id);
      }
      console.log(response);
      fetchShippers();
    } catch (error) {
      console.error(
        "Error get shippers:",
        error.response?.data?.message || error.message
      );
      toast.error(error);
      setError(error.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      return toast.error("Shipper ID is missing!");
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
      await deleteShipper(id);

      Swal.fire({
        icon: "success",
        title: "Shipper deleted successfully!",
      });

      setShippers((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data?.msg?.includes("assigned to at least one order")
      ) {
        Swal.fire({
          icon: "error",
          title: "Cannot delete shipper",
          text: "This shipper is assigned to at least one order!",
        });
      } else {
        // Lỗi khác
        toast.error("Failed to delete shipper");
      }
    }
  };

  // Detail
  const [showDetailPopup, setDetailPopup] = useState(false);
  const [selectedShipper, setSeletedShipper] = useState(null);

  const openDetailPopup = (shipper) => {
    setSeletedShipper(shipper);
    setDetailPopup(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredShippers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentShippers = filteredShippers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="shipper-list">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Shippers</h1>
      <div className="shipper-list-header">
        <div className="title">
          Shipper list
          <div className="action">
            <input
              type="text"
              placeholder="Input shipper name or id ..."
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
      </div>

      <div className="shipper-list-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentShippers.map((shipper, index) => (
              <tr key={shipper._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={shipper.avatar.url} alt="" />
                </td>
                <td>{shipper.name}</td>
                <td>{shipper.email}</td>
                <td>{shipper.phonenumber}</td>
                <td
                  className={
                    shipper.status === "APPROVED"
                      ? "status-approved"
                      : "status-blocked"
                  }
                >
                  {shipper.status}
                </td>
                <td>
                  <div className="action">
                    <img
                      src="/assets/admin-icons/info.png"
                      onClick={() => openDetailPopup(shipper)}
                    />
                    <img
                      src={
                        shipper.status === "APPROVED"
                          ? "/assets/admin-icons/block.png"
                          : "/assets/admin-icons/approve.png"
                      }
                      alt={shipper.status === "APPROVED" ? "Block" : "Approve"}
                      width="20"
                      height="20"
                      onClick={() =>
                        toggleShipperStatus(shipper._id, shipper.status)
                      }
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src="/assets/admin-icons/delete.png"
                      onClick={() => handleDelete(shipper._id)}
                    />
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
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(shippers.length / itemsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(shippers.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      {showDetailPopup && (
        <DetailShipperPopup
          showDetailPopup={showDetailPopup}
          shipper={selectedShipper}
          setShowDetailPopup={setDetailPopup}
        />
      )}
    </div>
  );
};

export default page;
