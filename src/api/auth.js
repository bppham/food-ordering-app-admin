import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const login = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Đăng nhập thất bại!");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const verifyOldPassword = async (oldPassword) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/api/v1/employee/verify-password`,
      { oldPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || "Error happend!";
  }
};

export const resetPassword = async (newPassword, id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/api/v1/employee/reset-password/${id}`,
      { newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message;
  }
};

// handle forget password
export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/forgot-password/employee`,
      { email }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error!");
  }
};

export const checkOTP = async (email, otp) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/check-otp/employee`,
      { email, otp }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error!");
  }
};

export const resetPasswordWithEmail = async (email, password) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/auth/reset-password/employee`,
      { email, password }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error!");
  }
};