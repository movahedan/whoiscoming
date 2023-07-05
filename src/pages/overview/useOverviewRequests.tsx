import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@whoiscoming-ui/constants";
import dayjs from "dayjs";

const transformSchedules = (data: any, campuses: any) =>
  (data || []).map((item: any) => {
    const start = dayjs.unix(item.startHour).format("HH:mm");
    const end = dayjs.unix(item.endHour).format("HH:mm");
    console.log(item.user, campuses);
    return {
      name: item.user.name,
      email: item.user.email,
      campus: campuses.find((x: any) => x.id === item.user.campus)?.name,
      id: item.user.id,
      hours: `${start} - ${end} `,
    };
  });

export const useSchedulesQuery = (selectedDate: string, campuses: any[]) => {
  return useQuery({
    queryKey: ["schedules", selectedDate],
    enabled: !!selectedDate,
    queryFn: async () => {
      // const fullDate = selectedDate.split("-");

      const URL = `${BASE_URL}/schedules/${selectedDate}`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      const jsonData = await response.json();
      return jsonData.data;
    },
    select: (data) => transformSchedules(data, campuses),
  });
};
