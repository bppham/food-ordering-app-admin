import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// User
export const getUserStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/stats`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error get user stats:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Store
export const getStoreStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/store/stats`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error get store stats:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Shipper
export const getShipperStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/shipper/stats`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error get shipper stats:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

// Order
export const getMonthlyOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/order/monthly-stats`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error get monthly-stats order stats:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
