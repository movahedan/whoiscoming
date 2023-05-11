import React from "react";
import { Layout } from "@whoiscoming-ui/ui/templates";
import { Table, Col, Row, Space, Card, message } from "antd";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";

type UserId = string | null;
const queryClient = new QueryClient();

export default function Overview() {
  let userId: UserId = null;

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

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
        <>
          {console.log(isCurrentUser)}
          {!isCurrentUser ? (
            isFavorite ? (
              <HeartTwoTone
                twoToneColor="#eb2f96"
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={() => setFavorite(id, false)}
              />
            ) : (
              <HeartOutlined
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={() => setFavorite(id, true)}
              />
            )
          ) : (
            <span style={{ fontSize: "12px", color: "#eb2f96" }}>
              Always{" "}
              <HeartTwoTone
                twoToneColor="#eb2f96"
                style={{ fontSize: "12px" }}
              />{" "}
              yourself
            </span>
          )}
        </>
      ),
    },
  ];

  const userMutation = useMutation(
    (favoritePeople) => {
      const URL = `http://localhost:3000/users/${userId}`;

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
        currentUserQuery.refetch();
      },
      onError: () => {
        message.error("Could not update favorite people! Try again!");
      },
    }
  );

  const currentUserQuery = useQuery({
    queryKey: ["users", userId],
    enabled: !!userId,
    queryFn: async () => {
      const URL = `http://localhost:3000/users/${userId}`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      return response.json();
    },
  });

  const favoritePeople = currentUserQuery.data?.favoritePeople || [];

  const setFavorite = (id: string, makeFavorite: boolean) => {
    let filterFavorite = [];
    if (!makeFavorite) {
      filterFavorite = favoritePeople.filter((x: string) => x !== id);
    } else {
      filterFavorite = [...favoritePeople, id];
    }

    return userMutation.mutate(filterFavorite);
  };

  const allUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const URL = `http://localhost:3000/users/`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      return response.json();
    },
  });

  const dataSource = (allUsersQuery.data || []).map((item: any) => {
    return {
      name: item.name,
      email: item.email,
      id: item["_id"],
      isCurrentUser: userId === item["_id"],
      isFavorite: favoritePeople.includes(item["_id"]),
    };
  });

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
                dataSource={dataSource}
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
