"use client";
import dayjs from "dayjs";

export function formatDateWithDayjs(dateString: string | undefined) {
  return dayjs(dateString).format("DD-MM-YYYY");
}

export function formatDateWithMonthNameDayjs(dateString: string | undefined) {
  if (!dateString) return "";
  return dayjs(dateString).format("D MMM YYYY");
}

export function formatPrice(value: string | number, currency: string = "INR") {
  if (!value && value !== 0) return "";
  const num = Number(value);
  if (isNaN(num)) return value;
  const locale = currency.toUpperCase() === "INR" ? "en-IN" : "en-US";
  return num.toLocaleString(locale);
}

// ✅ Session-only temp_id (resets on browser close)
export const getTempId = () => {
  let tempId = sessionStorage.getItem("temp_id");

  // ✅ Generate new ID if none exists in session
  if (!tempId) {
    tempId = "guest_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("temp_id", tempId);
  }

  return tempId;
};

// ✅ Clear session storage on logout
export const removeTempId = () => {
  sessionStorage.removeItem("temp_id");
};

export const formatCurrency = (amount: number, currency: string) => {
  const locale = currency.toUpperCase() === "INR" ? "en-IN" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
};

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(iso));

export const copyToClip = (text: string) => navigator.clipboard.writeText(text);

// Word Limit Function
export const limitChars = (text: string, limit: number) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

// Country detect
export const isIndia = () => {
  if (typeof window === "undefined") {
    console.log("[isIndia] window is undefined (SSR). Returning false.");
    return false;
  }
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const result = tz === "Asia/Kolkata" || tz === "Asia/Calcutta";
  console.log(`[isIndia] Detected timezone: "${tz}". isIndia result: ${result}`);
  return result;
};
