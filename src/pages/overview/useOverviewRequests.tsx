import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@whoiscoming-ui/constants";

const transformSchedules = (data: any) =>
  (data || []).map((item: any) => {
    return {
      name: item.user.name,
      email: item.user.email,
      id: item.user.id,
      hours: `${item.startHour}:00 - ${item.endHour}:00 `,
    };
  });

export const useSchedulesQuery = (selectedDate: string) => {
  return useQuery({
    queryKey: ["schedules", selectedDate],
    enabled: !!selectedDate,
    queryFn: async () => {
      const fullDate = selectedDate.split("-");

      const URL = `${BASE_URL}/schedules/${Number(fullDate[2])}/${Number(
        fullDate[1]
      )}/${Number(fullDate[0])}`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      const jsonData = await response.json();
      return jsonData.data;
    },
    select: transformSchedules,
  });
};
