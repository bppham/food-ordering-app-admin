"use client";
import React, { useEffect, useState } from "react";
import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import { getMonthlyOrders } from "../../api/home";
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
    <div className="">
      <div className=" h-[calc(100vh-100px)]">
        <FeaturedInfo />
        <Chart data={orderData} title="Order Analytics" grid dataKey="total" />
      </div>
    </div>
  );
};

export default home;
