"use client";
import axios from "axios";
import { store } from "@/redux/store";
import { setCurrencyContext } from "@/redux/currencySlice";
import { isIndia } from "@/utils/helper";

// const baseURL = process.env.NEXT_PUBLIC_APP_URL;
const baseURL =
  "https://christeen-unmaidenlike-bloomingly.ngrok-free.dev/api/v1/";

const apiAdminInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  // headers: {
  //   'Content-Type': 'multipart/form-data'
  // }
});

export const api = apiAdminInstance;

apiAdminInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("auth_token");
    // const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["ngrok-skip-browser-warning"] = "true";
    
    // Add timezone-based country header for backend fallback when Nginx IP fails
    config.headers["x-country-code"] = isIndia() ? "IN" : "US";

    return config;
  },
  (error) => Promise.reject(error)
);

apiAdminInstance.interceptors.response.use(
  function (response) {
    if (response.data && response.data.user_currency && response.data.user_country) {
      store.dispatch(
        setCurrencyContext({
          userCountry: response.data.user_country,
          userCurrency: response.data.user_currency,
        })
      );
    }
    return response;
  },
  (error) => {
    const { response } = error;

    if (response.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
