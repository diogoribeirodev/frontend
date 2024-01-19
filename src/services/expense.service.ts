import axios from "axios";

import {
  type UpdateExpenseParams,
  type NewExpenseParams,
} from "@/schemas/expense";

const API_URL = "http://localhost:3001/api/expenses/";

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const getAll = () => {
  return axios.get(API_URL);
};

const getById = (number: number) => {
  return axios.get(API_URL + number);
};

const create = (values: NewExpenseParams) => {
  return axios.post(API_URL + "", {
    values,
  });
};

const update = (values: NewExpenseParams, id:number) => {
  return axios.put(API_URL + id, {
    values,
  });
};

const deleteExpense = (number: number) => {
  return axios.delete(API_URL + number);
};

const ExpenseService = {
  getAll,
  getById,
  create,
  update,
  deleteExpense,
};

export default ExpenseService;
