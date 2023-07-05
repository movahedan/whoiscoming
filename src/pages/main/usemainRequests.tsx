import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@whoiscoming-ui/constants";
// import { parseDate } from "@whoiscoming-ui/utilities";
import { message } from "antd";

interface Schedule {
  selectedDate: string;
  hourRange: [number, number];
  status: "IN_OFFICE" | "OUT_OF_OFFICE";
}

export const useCreateScheduleMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ selectedDate, hourRange, status }: Schedule) => {
      console.log({
        userId: userId,
        date: selectedDate,
        status: status, //  IN_OFFICE, OUT_OF_OFFICE,
        startHour: hourRange[0] || 8,
        endHour: hourRange[1] || 17,
      });

      const URL = `${BASE_URL}/schedules`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          date: selectedDate,
          status: status, //  IN_OFFICE, OUT_OF_OFFICE,
          startHour: hourRange[0] || 8,
          endHour: hourRange[1] || 17,
        }),
      };

      return fetch(URL, options);
    },
    {
      onSuccess: () => {
        message.success("Success!");

        return queryClient.refetchQueries({
          queryKey: ["schedules", "user", userId],
        });
      },
      onError: () => {
        message.error("Error!");
      },
    }
  );
};

// export const useRemoveScheduleMutation = (userId: string) => {
//   const queryClient = new QueryClient();

//   return useMutation(
//     (item: any) => {
//       const { day, month, year } = item;

//       const URL = `${BASE_URL}/schedules/${userId}/${day}/${month}/${year}`;
//       const options = {
//         method: "DELETE",
//       };

//       return fetch(URL, options);
//     },
//     {
//       onSuccess: () => {
//         message.success("Schedule removed successfully");
//         queryClient.invalidateQueries({
//           queryKey: ["schedules", "user", userId],
//         });
//       },
//       onError: () => {
//         message.error("Error deleting schedule");
//       },
//     }
//   );
// };

export const useScheduleQuery = (userId: string) =>
  useQuery({
    queryKey: ["schedules", "user", userId],
    queryFn: () => {
      return fetch(`${BASE_URL}/schedules/user/${userId}`, {
        method: "GET",
      }).then((res) => res.json());
    },
    enabled: !!userId,
    select: (data) => {
      return data.data;
    },
  });
