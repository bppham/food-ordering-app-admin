"use client";
import React, { useEffect, useState } from "react";
import "./home.css";
import Chart from "../components/Chart/Chart";
import FeaturedInfo from "../components/FeaturedInfo/FeaturedInfo";
import WidgetSmall from "../components/WidgetSmall/WidgetSmall";
import WidgetLarge from "../components/WidgetLarge/WidgetLarge";
import { getMonthlyOrders } from "../api/home";
const home = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchMonlyOrders();
  }, []);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fetchMonlyOrders = async () => {
    try {
      const response = await getMonthlyOrders();
      if (response.code === 200) {
        const englishMonthData = response.data.map((item, index) => ({
          name: monthNames[index], // thay thế tên tháng
          total: item.total,
        }));
        setOrderData(englishMonthData);
      }
    } catch (error) {
      console.log("Error get order stats");
    }
  };

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={orderData} title="Order Analytics" grid dataKey="total" />
    </div>
  );
};

export default home;
