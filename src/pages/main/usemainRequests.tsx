import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@whoiscoming-ui/constants";
import { parseDate } from "@whoiscoming-ui/utilities";
import { message } from "antd";

interface Schedule {
  selectedDate: string;
  hourRange: [number, number];
}

export const useCreateScheduleMutation = (userId: string) => {
  const queryClient = new QueryClient();

  return useMutation(
    ({ selectedDate, hourRange }: Schedule) => {
      const URL = `${BASE_URL}/schedules`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          ...parseDate(selectedDate),
          startHour: hourRange[0],
          endHour: hourRange[1],
        }),
      };

      return fetch(URL, options);
    },
    {
      onSuccess: () => {
        message.success("Schedule created successfully");
        queryClient.invalidateQueries({
          queryKey: ["schedules", "schedules/user/"],
        });
      },
      onError: () => {
        message.error("Error creating schedule");
      },
    }
  );
};

export const useRemoveScheduleMutation = (userId: string) => {
  const queryClient = new QueryClient();

  return useMutation(
    (item: any) => {
      const { day, month, year } = item;

      const URL = `${BASE_URL}/schedules/${userId}/${day}/${month}/${year}`;
      const options = {
        method: "DELETE",
      };

      return fetch(URL, options);
    },
    {
      onSuccess: () => {
        message.success("Schedule removed successfully");
        queryClient.invalidateQueries({
          queryKey: ["schedules/user/", userId],
        });
      },
      onError: () => {
        message.error("Error deleting schedule");
      },
    }
  );
};

export const useScheduleQuery = (userId: string) =>
  useQuery({
    queryKey: ["schedules/user/", userId],
    queryFn: () =>
      fetch("${BASE_URL}/schedules/user/" + userId, {
        method: "GET",
      }).then((res) => res.json()),
    enabled: !!userId,
  });
