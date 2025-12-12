"use client";
import dayjs from "dayjs";

export function formatDateWithDayjs(dateString : string | undefined) {
  return dayjs(dateString).format("DD-MM-YYYY");
}

export function formatDateWithMonthNameDayjs(dateString: string | undefined) {
  if (!dateString) return "";
  return dayjs(dateString).format("D MMM YYYY");
}

export function formatPrice(value: string | number) {
  if (!value && value !== 0) return "";
  const num = Number(value);
  if (isNaN(num)) return value;
  return num.toLocaleString("en-IN");
}

//temp_Id generate pc wise
export const getTempId = () => {
  let tempId = sessionStorage.getItem("temp_id");

  if (!tempId) {
    tempId = "guest_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("temp_id", tempId);
  }
  return tempId;
};

export const removeTempId = () => {
  sessionStorage.removeItem("temp_id");
};

export const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(iso));

export const copyToClip = (text: string) => navigator.clipboard.writeText(text);

// Word Limit Function
export const limitChars = (text: string, limit: number) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};
