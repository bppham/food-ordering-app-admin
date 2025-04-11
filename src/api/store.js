import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllStores = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/store/ongoing`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error get all stores:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const getPendingStores = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/store/pending`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error get pending stores:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const getStoreInformation = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/store/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error get store information:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const approveStore = async (storeId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/store/${storeId}/approve`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.log("Error can not approve store: ", error);
    throw error;
  }
};

export const blockStore = async (storeId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/store/${storeId}/block`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.log("Error can not block store: ", error);
    throw error;
  }
};
