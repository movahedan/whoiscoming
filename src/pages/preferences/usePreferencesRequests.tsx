import { message } from "antd";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@whoiscoming-ui/constants";
type UserId = string | null;
const queryClient = new QueryClient();
type Campus = {
  name: string;
  id: string;
};
export const useUserMutation = (userId: UserId, refetchCallback: () => void) =>
  useMutation(
    (favoritePeople) => {
      const URL = `${BASE_URL}/users/${userId}`;
      console.log("mutation call ");
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          favoritePeople: favoritePeople,
        }),
      };
      console.log(options);
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
        console.log("error");

        message.error("Could not update favorite people! Try again!");
      },
    }
  );
export const useGetCampuses = () =>
  useQuery({
    queryKey: ["campuses"],
    queryFn: async () => {
      const URL = `${BASE_URL}/campuses`;
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      const jsonData = await response.json();

      if (jsonData) {
        return jsonData;
      } else {
        throw new Error("Data property not found in the response");
      }
    },
  });

export const useCurrentUserQuery = (userId: UserId) =>
  useQuery({
    queryKey: ["user", userId],
    enabled: !!userId,
    queryFn: async () => {
      const URL = `${BASE_URL}/users/id/${userId}`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

const transformAllUsersToTableData = (
  data: any,
  userId: UserId,
  favoritePeople: string[],
  campuses: Campus[]
) =>
  data.map((item: any) => {
    return {
      name: item.name,
      email: item.email,
      campus: campuses.find((x) => x.id === item.campus)?.name || "",
      id: item["_id"],
      isCurrentUser: userId === item["_id"],
      isFavorite: favoritePeople.includes(item["_id"]),
    };
  });

export const useAllUsersQuery = (
  userId: UserId,
  favoritePeople: string[],
  campuses: Campus[]
) =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const URL = `${BASE_URL}/users/`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      return response ? response.json() : {};
    },
    select: (data) =>
      transformAllUsersToTableData(data, userId, favoritePeople, campuses),
  });
