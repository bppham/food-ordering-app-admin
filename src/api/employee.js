import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addEmployee = async (employeeData, imgURL) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/employee`,
      { ...employeeData, avatar: { url: imgURL } },
      {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error add employee:", error.response?.data || error);
    throw error.response?.data?.message || "Có lỗi xảy ra!";
  }
};

export const uploadAvatarImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      `${BASE_URL}/api/v1/upload/avatar/employee`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data[0].url);
    return response.data[0].url;
  } catch (error) {
    console.error("Error upload image (avatar) ", error);
    throw error;
  }
};

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/employee`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error get all employees:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const blockEmployee = async (id) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/employee/${id}/block`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.log("Error can not block employee: ", error);
    throw error;
  }
};

export const approveEmployee = async (id) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/employee/${id}/approve`,
      {},
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.log("Error can not approve employee: ", error);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData, imgURL) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/employee/${id}`,
      { ...employeeData, avatar: { url: imgURL } },
      {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error upload employee:", error.response?.data || error);
    throw error.response?.data?.message || "Error";
  }
};

export const deleteEmployee = async (id) => {
  if (!id) {
    throw new Error("Employee ID is missing");
  }

  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/employee/${id}`, {
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error("Error delete employee:", error);
    throw error;
  }
};

export const getEmployee = async (employeeId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/employee/${employeeId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get data employee:", error);
    throw error;
  }
};