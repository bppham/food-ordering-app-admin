"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./store-request.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { getPendingStores, approveStore } from "../../../api/store";
import DetailStorePopup from "../../../components/Store/DetailStorePopup/DetailStorePopup"

const store_request = () => {
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const data = await getPendingStores();
      setStores(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetch data stores:", error);
    }
  };

  const [showDetailPopup, setDetailPopup] = useState(false);
  const [selectedStore, setSeletedStore] = useState(null);

  const openDetailPopup = (store) => {
    setSeletedStore(store);
    setDetailPopup(true);
  };

  const handleApprove = async (storeId) => {
    try {
      await approveStore(storeId);
      toast.success("Store approved successfully!");
      fetchStores();
    } catch (error) {
      toast.error("Failed to approve store");
      console.error("Error approving store:", error);
    }
  };

  const totalPages = Math.ceil(stores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStores = stores.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className="store-request">
      <ToastContainer position="top-right" autoClose={3000} />
      <p className="title">List Of Store Requests</p>
      <div className="list-of-request">
        {currentStores.map((store) => (
          <div className="item" key={store._id}>
            <div className="item-left">
              <img
                src={store.avatar?.url || "default-avatar.png"}
                alt="Store Avatar"
              />
              <div className="store-owner">
                <div className="relative flex flex-col gap-[4px] w-[30px] h-[30px] pt-[30px]">
                  <Image
                    src="/assets/admin-icons/store-owner.png"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[8px]"
                  />
                </div>
                {store.owner.name}
              </div>
            </div>
            <div className="item-right">
              <div className="store-name">{store.name}</div>
              <div className="address">
                <div className="relative flex flex-col gap-[4px] w-[30px] h-[30px] pt-[30px]">
                  <Image
                    src="/assets/admin-icons/location.png"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[8px]"
                  />
                </div>
                {store.address.full_address}
              </div>

              <div className="action">
                <button onClick={() => handleApprove(store._id)}>
                  Approve
                </button>
                <button onClick={() => openDetailPopup(store)}>Detail</button>
              </div>
            </div>
          </div>
        ))}

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

export default store_request;
