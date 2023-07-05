import React, { useMemo } from "react";
import { Layout } from "@whoiscoming-ui/ui/templates";
import { Table, Col, Row, Space, Card } from "antd";
import {
  useUserMutation,
  useCurrentUserQuery,
  useAllUsersQuery,
  useGetCampuses,
} from "./usePreferencesRequests";
import FavoriteHeart from "@whoiscoming-ui/ui/molecules/FavoriteHeart/FavoriteHeart";

type UserId = string | null;

export default function Overview() {
  let userId: UserId = null;

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }
  // Queries
  const currentUserQuery = useCurrentUserQuery(userId);
  const user = currentUserQuery.data || {};

  const campusesQuery = useGetCampuses();

  const favoritePeople = user?.favoritePeople || [];
  const allUsersQuery = useAllUsersQuery(
    userId,
    favoritePeople,
    campusesQuery.data
  );
  // Mutation
  const useMyFavoritePeopleMutation = useUserMutation(
    userId,
    currentUserQuery.refetch
  );

  const setFavorite = (id: string, makeFavorite: boolean) => {
    let filteredFavoritePeople = [];
    if (!makeFavorite) {
      filteredFavoritePeople = favoritePeople.filter((x: string) => x !== id);
    } else {
      filteredFavoritePeople = [...favoritePeople, id];
    }

    return useMyFavoritePeopleMutation.mutate(filteredFavoritePeople);
  };

  const currentUserCampus = campusesQuery?.data?.find(
    (x: any) => x.id === user.campus
  )?.name;

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        filterSearch: true,
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        filterSearch: true,
        key: "email",
      },
      {
        title: "Campus",
        dataIndex: "campus",
        key: "campus",
        filterSearch: true,
        filterMultiple: false,
        filters: campusesQuery.data?.map((x: any) => ({
          text: x.name,
          value: x.name,
        })),
        onFilter: (value: any, record: any) => {
          return record.campus === value;
        },
        defaultFilteredValue: [currentUserCampus || "Campus Eindhoven"],
      },
      {
        title: "Favorite",
        dataIndex: "isFavorite",
        key: "isFavorite",
        render: (_: any, { isFavorite, id, isCurrentUser }: any) => (
          <FavoriteHeart
            isFavorite={isFavorite}
            id={id}
            isCurrentUser={isCurrentUser}
            setFavorite={() => setFavorite(id, !isFavorite)}
          />
        ),
      },
    ],
    [currentUserQuery.isLoading, currentUserCampus, campusesQuery.data]
  );

  return (
    <Layout>
      <Card>
        <Row justify="center">
          {(allUsersQuery.isFetching || allUsersQuery.isLoading) &&
            "Loading..."}

          <Col
            xs={24}
            sm={24}
            md={20}
            lg={14}
            xl={14}
            style={{ padding: "16px" }}
          >
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                paddingTop: "16px",
              }}
              direction="vertical"
            >
              <Table
                // title="List of people"
                dataSource={allUsersQuery.data}
                columns={columns}
                pagination={{ hideOnSinglePage: true }}
                loading={
                  allUsersQuery.isLoading ||
                  currentUserQuery.isLoading ||
                  campusesQuery.isLoading
                }
              />
            </Space>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}
