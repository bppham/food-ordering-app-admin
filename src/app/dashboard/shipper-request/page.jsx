"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./shipper-request.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import { getPendingShippers, approveShipper } from "../../../api/shipper";

const shipper_request = () => {
  const [shippers, setShippers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchShipper();
  }, []);

  const fetchShipper = async () => {
    try {
      const data = await getPendingShippers();
      setShippers(data);
    } catch (error) {
      console.error("Error fetch data shipper:", error);
    }
  };

  const handleApprove = async (shipperId) => {
    try {
      await approveShipper(shipperId);
      toast.success("Shipper approved successfully!");
      fetchShipper();
    } catch (error) {
      toast.error("Failed to approve shipper");
      console.error("Error approving shipper:", error);
    }
  };

  const totalPages = Math.ceil(shippers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentShippers = shippers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="shipper-request">
      <ToastContainer position="top-right" autoClose={3000} />
      <p className="title">List Of Shipper Requests</p>
      <div className="list-of-request">
        {currentShippers.map((shipper) => (
          <div className="item" key={shipper._id}>
            <div className="item-left">
              <img
                src={shipper.avatar?.url || "default-avatar.png"}
                alt="Shipper Avatar"
              />
            </div>
            <div className="item-right">
              <div className="shipper-id">{shipper._id}</div>
              <div className="info-container">
                <div className="item-row">
                  <div className="info-item">
                    <label>Name:</label>
                    <p>{shipper.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <p>{shipper.email}</p>
                  </div>
                </div>
                <div className="item-row">
                  <div className="info-item">
                    <label>Phone number:</label>
                    <p>{shipper.phonenumber}</p>
                  </div>
                  <div className="info-item">
                    <label>Gender:</label>
                    <p>{shipper.gender}</p>
                  </div>
                </div>
              </div>
              <div className="action">
                <button onClick={() => handleApprove(shipper._id)}>
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default shipper_request;
