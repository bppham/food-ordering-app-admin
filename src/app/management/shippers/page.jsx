"use client";
import "./shipper.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAllShipper } from "../../../api/shipper";
import DetailShipper from "../../../components/Shipper/DetailShipper"

const page = () => {
  const [shippers, setShippers] = useState([]);
  const [filteredShippers, setFilteredShippers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedShipper, setSelectedShipper] = useState(null);

  useEffect(() => {
    fetchShippers();
  }, []);

  useEffect(() => {
    handleSearchAndSort();
  }, [searchTerm, sortOrder, shippers]);

  const fetchShippers = async () => {
    try {
      const data = await getAllShipper();
      setShippers(data);
    } catch (error) {
      console.error("Error fetch data shippets: ", error);
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

  // Pagination logic
  const totalPages = Math.ceil(filteredShippers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentShippers = filteredShippers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="shipper-list">
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
                <td>{shipper.phonenumber}</td>
                <td>{shipper.status}</td>
                <td>
                  <div className="action">
                    <button>Lock</button>
                    <button onClick={() => setSelectedShipper(shipper)}>
                      Detail
                    </button>
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
      {selectedShipper && (
        <DetailShipper
          shipper={selectedShipper}
          onClose={() => setSelectedShipper(null)}
        />
      )}
    </div>
  );
};

export default page;
