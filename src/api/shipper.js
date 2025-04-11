import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getPendingShippers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/shipper/pending`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách FoodType:", error);
    throw error;
  }
};

export const approveShipper = async (shipperId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/shipper/${shipperId}/approve`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.log("Error can not approve shipper: ", error);
    throw error;
  }
};

export const blockShipper = async (shipperId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/shipper/${shipperId}/block`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.log("Error can not block shipper: ", error);
    throw error;
  }
};

export const getCurrentShippers = async () => {
  try {
    const resposne = await axios.get(`${BASE_URL}/api/v1/shipper/current`);
    console.log(resposne);
    return resposne.data;
  } catch (error) {
    console.log("Error can not approve shipper: ", error);
    throw error;
  }
};

export const deleteShipper = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/shipper/${id}`, {
      headers: getAuthHeaders(),
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error can not delete shipper: ", error);
    throw error;
  }
};
