import dayjs from "dayjs";

export function formatDateWithDayjs(dateString : string | undefined) {
  return dayjs(dateString).format("DD-MM-YYYY");
}

export function formatDateWithMonthNameDayjs(dateString: string | undefined) {
  if (!dateString) return "";
  return dayjs(dateString).format("D MMM YYYY");
}