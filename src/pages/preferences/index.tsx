import React from "react";
import { Layout } from "@whoiscoming-ui/ui/templates";
import { Table, Col, Row, Space, Card } from "antd";
import {
  useUserMutation,
  useCurrentUserQuery,
  useAllUsersQuery,
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
  const favoritePeople = currentUserQuery.data?.favoritePeople || [];
  const allUsersQuery = useAllUsersQuery(userId, favoritePeople);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
  ];

  return (
    <Layout>
      <Card>
        <Row>
          <Col span={12} style={{ padding: "16px" }}>
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                paddingTop: "16px",
              }}
              direction="vertical"
            >
              List of people
              <Table
                dataSource={allUsersQuery.data}
                columns={columns}
                pagination={{ hideOnSinglePage: true }}
                loading={allUsersQuery.isLoading}
              />
            </Space>
          </Col>
        </Row>
        {(allUsersQuery.isFetching || allUsersQuery.isLoading) && "Loading..."}
      </Card>
    </Layout>
  );
}
