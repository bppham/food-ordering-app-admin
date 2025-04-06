"use client";
import React, { useEffect, useState } from "react";
import "./FeaturedInfo.css";
import { getUserStats, getStoreStats, getShipperStats } from "../../api/home";

const FeaturedInfo = () => {
  // Order
  const [allUser, setAllUser] = useState(0);
  const [thisMonthUser, setThisMonhtUser] = useState(0);

  // Store
  const [allStore, setAllStore] = useState(0);
  const [thisMonthStore, setThisMonthStore] = useState(0);

  // Shipper
  const [allShipper, setAllShipper] = useState(0);
  const [thisMonthShipper, setThisMonthShipper] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchStores();
    fetchShippers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUserStats();
      if (response.code === 200) {
        setAllUser(response.data.totalUsers);
        setThisMonhtUser(response.data.newUsersThisMonth);
      }
    } catch (error) {
      console.log("Error get user stats");
    }
  };

  const fetchStores = async () => {
    try {
      const response = await getStoreStats();
      if (response.code === 200) {
        setAllStore(response.data.totalStores);
        setThisMonthStore(response.data.storesThisMonth);
      }
    } catch (error) {
      console.log("Error get user stats");
    }
  };

  const fetchShippers = async () => {
    try {
      const response = await getShipperStats();
      if (response.code === 200) {
        setAllShipper(response.data.totalShippers);
        setThisMonthShipper(response.data.shippersThisMonth);
      }
    } catch (error) {
      console.log("Error get user stats");
    }
  };

  return (
    <div className="featured">
      <div className="featured-item">
        <span className="featured-title">Users</span>
        <div className="featured-money-container">
          <span className="featured-money">{allUser}</span>
        </div>
        <span className="featured-sub">This month: {thisMonthUser}</span>
      </div>

      <div className="featured-item">
        <span className="featured-title">Stores</span>
        <div className="featured-money-container">
          <span className="featured-money">{allStore}</span>
        </div>
        <span className="featured-sub">This month: {thisMonthStore}</span>
      </div>

      <div className="featured-item">
        <span className="featured-title">Shippers</span>
        <div className="featured-money-container">
          <span className="featured-money">{allShipper}</span>
        </div>
        <span className="featured-sub">This month: {thisMonthShipper}</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
