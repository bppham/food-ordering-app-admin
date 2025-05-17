"use client";
import "./stores.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAllStores, approveStore, blockStore } from "../../../api/store";
import DetailStorePopup from "../../../components/Store/DetailStorePopup/DetailStorePopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    handleSearchAndSort();
    stores;
  }, [searchTerm, sortOrder, stores]);

  const fetchStores = async () => {
    try {
      const data = await getAllStores();
      setStores(data);
    } catch (error) {
      console.error("Error fetch data stores: ", error);
    }
  };

  const handleSearchAndSort = () => {
    let updatedList = [...stores];

    // Search
    if (searchTerm) {
      updatedList = updatedList.filter((store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase())
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

    setFilteredStores(updatedList);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm/sắp xếp
  };

  // BLOCK SHIPPER
  const toggleStoreStatus = async (id, status) => {
    try {
      let response;
      if (status === "BLOCKED") {
        response = await approveStore(id);
      } else {
        response = await blockStore(id);
      }
      console.log(response);
      fetchStores();
    } catch (error) {
      console.error(
        "Error get stores:",
        error.response?.data?.message || error.message
      );
      toast.error(error);
    }
  };

  // Detail
  const [showDetailPopup, setDetailPopup] = useState(false);
  const [selectedStore, setSeletedStore] = useState(null);

  const openDetailPopup = (store) => {
    setSeletedStore(store);
    setDetailPopup(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStores = filteredStores.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div className="store-list">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Stores</h1>
      <div className="store-list-header">
        <div className="title">
          Store list
          <div className="action">
            <input
              type="text"
              placeholder="Input store name or id ..."
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

      <div className="store-list-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStores.map((store, index) => (
              <tr key={store._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={store.avatar.url} alt="" />
                </td>
                <td>{store.name}</td>
                <td>{store.address.full_address}</td>
                <td
                  className={
                    store.status === "APPROVED"
                      ? "status-approved"
                      : "status-blocked"
                  }
                >
                  {store.status}
                </td>
                <td>
                  <div className="action">
                    <img
                      src="/assets/admin-icons/info.png"
                      onClick={() => openDetailPopup(store)}
                    />
                    <img
                      src={
                        store.status === "APPROVED"
                          ? "/assets/admin-icons/block.png"
                          : "/assets/admin-icons/approve.png"
                      }
                      alt={store.status === "APPROVED" ? "Block" : "Approve"}
                      width="20"
                      height="20"
                      onClick={() => toggleStoreStatus(store._id, store.status)}
                      style={{ cursor: "pointer" }}
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
              Math.min(prev + 1, Math.ceil(authors.length / itemsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(stores.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      {showDetailPopup && (
        <DetailStorePopup
          showDetailPopup={showDetailPopup}
          store={selectedStore}
          setShowDetailPopup={setDetailPopup}
        />
      )}
    </div>
  );
};

export default page;
