import type { Dayjs } from "dayjs";

export const dateFormat = "YYYY-MM-DD";
export const formatDate = (date: Dayjs) => date.format(dateFormat);

type ParsedDate = {
  day: number;
  month: number;
  year: number;
};

export const parseDate = (selectedDate: string): ParsedDate => {
  const date = selectedDate.split("-");

  return {
    day: Number(date[2]),
    month: Number(date[1]),
    year: Number(date[0]),
  };
};
