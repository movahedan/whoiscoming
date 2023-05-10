import React from "react";
import { Layout } from "@whoiscoming-ui/ui/templates";
import { Table, Col, Row, Space, Card } from "antd";
import { useQuery } from "@tanstack/react-query";

import { Calendar } from "@whoiscoming-ui/ui/organisms";
interface IDate {
  day: number;
  month: number;
  year: number;
}
export default function Overview() {
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
      title: "Hours",
      dataIndex: "hours",
      key: "hours",
    },
  ];
  const [selectedDay, setSelectedDay] = React.useState<IDate>({
    day: 1,
    month: 1,
    year: 2023,
  });

  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const URL = `http://localhost:3000/schedules/${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`;

      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      const jsonData = await response.json();
      return jsonData.data;
    },
  });

  const dataSource = (query.data || []).map((item: any) => {
    return {
      name: item.user.name,
      email: item.user.email,
      id: item.user.id,
      hours: `${item.startHour}:00 - ${item.endHour}:00 `,
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
                loading={query.isLoading}
              />
            </Space>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}
