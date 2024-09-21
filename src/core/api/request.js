import axios from "axios";
import ErrorHandler from "./ErrorHandler";
import SuccessHandler from "./SuccessHandler";

const api = axios.create({
  baseURL: process.env.REACT_APP_API + "api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
     "X-Requested-With": "XMLHttpRequest",
     "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`,
     "Access-control-request-methods": "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS",
  },
});

 

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const create = async (entity, jsonData) => {
  try {
    const response = await api.post(`${entity}`, jsonData);
    return SuccessHandler(response, { notifyOnSuccess: true });
  } catch (error) {
    return ErrorHandler(error);
  }
};

const update = async (entity, id, jsonData) => {
  try {
    const response = await api.patch(`${entity}/${id}`, jsonData);
    SuccessHandler(response, { notifyOnSuccess: true });
    return response.data;
  } catch (error) {
    return ErrorHandler(error);
  }
};

const read = async (entity, id) => {
  try {
    const response = await api.get(`${entity}/${id}`);
    SuccessHandler(response, { notifyOnSuccess: false });
    return response.data;
  } catch (error) {
    return ErrorHandler(error);
  }
};

const remove = async (entity, id) => {
  try {
    const response = await api.delete(`${entity}/${id}`);
    SuccessHandler(response, { notifyOnSuccess: true });
    return response.data;
  } catch (error) {
    return ErrorHandler(error);
  }
};

const list = async (entity, options = {}) => {
  try {
    let query = "?";
    for (const key in options) {
      query += `${key}=${options[key]}&`;
    }
    query = query.slice(0, -1);

    const response = await api.get(`${entity}${query}`);
    SuccessHandler(response, { notifyOnSuccess: false });
    return response.data;
  } catch (error) {
    return ErrorHandler(error);
  }
};

export const request = { create, list, read, remove, update };
