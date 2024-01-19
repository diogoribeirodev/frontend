import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";
const signup = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
  if (response.data) {
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(API_URL + "signin", { email, password });
  if (response.data) {
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

const signout = () => {
  localStorage.clear();
};

const getCurrentUser = () => {
  return localStorage.getItem("name");
};

const AuthService = {
  signup,
  signin,
  signout,
  getCurrentUser,
};

export default AuthService;
