import { message } from "antd";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@whoiscoming-ui/constants";
type UserId = string | null;
const queryClient = new QueryClient();

export const useUserMutation = (userId: UserId, refetchCallback: () => void) =>
  useMutation(
    (favoritePeople) => {
      const URL = `${BASE_URL}/users/${userId}`;

      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          favoritePeople: favoritePeople,
        }),
      };
      return fetch(URL, options);
    },
    {
      onSuccess: () => {
        message.success("Favorite people updated");
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        refetchCallback && refetchCallback();
      },
      onError: () => {
        message.error("Could not update favorite people! Try again!");
      },
    }
  );

export const useCurrentUserQuery = (userId: UserId) =>
  useQuery({
    queryKey: ["users", userId],
    enabled: !!userId,
    queryFn: async () => {
      const URL = `${BASE_URL}/users/${userId}`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      return response.json();
    },
  });

const transformAllUsersToTableData = (
  data: any,
  userId: UserId,
  favoritePeople: string[]
) =>
  data.map((item: any) => {
    return {
      name: item.name,
      email: item.email,
      id: item["_id"],
      isCurrentUser: userId === item["_id"],
      isFavorite: favoritePeople.includes(item["_id"]),
    };
  });

export const useAllUsersQuery = (userId: UserId, favoritePeople: string[]) =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const URL = `${BASE_URL}/users/`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      return response.json();
    },
    select: (data) =>
      transformAllUsersToTableData(data, userId, favoritePeople),
  });
