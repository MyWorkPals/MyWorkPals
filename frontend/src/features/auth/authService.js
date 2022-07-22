import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Forget password
const forgetPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgetPassword", userData);
  return response.data;
};

// Reset pasword
const authenticateResetPassword = async (token) => {
  const response = await axios.get(API_URL + "reset/" + token);
  return response.data;
};

// reset password for user
const resetPw = async (userData) => {
  const response = await axios.patch(
    API_URL + "updatePasswordViaEmail",
    userData
  );

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  forgetPassword,
  authenticateResetPassword,
  resetPw,
};

export default authService;
