import React, { useState } from "react";
import dayjs from "dayjs";
import { Layout } from "@whoiscoming-ui/ui/templates";
import { Table, Col, Row, Space, Card } from "antd";

import { Calendar } from "@whoiscoming-ui/ui/organisms";
import { useSchedulesQuery } from "./useOverviewRequests";

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

export default function Overview() {
  const [selectedDate, setSelectedDay] = useState(dayjs().format("YYYY-MM-DD"));

  const schedulesQuery = useSchedulesQuery(selectedDate);

  const onDaySelect = (value: string) => {
    setSelectedDay(value);
  };

  return (
    <Layout>
      <Card>
        <Row>
          <Col span={10} style={{ padding: "16px" }}>
            <Calendar
              dataTestId="overview-page-calendar"
              onSelect={onDaySelect}
            />
          </Col>
          <Col span={12} style={{ padding: "16px" }}>
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                paddingTop: "34px",
              }}
              direction="vertical"
            >
              <Table
                dataSource={schedulesQuery.data}
                columns={columns}
                pagination={{ hideOnSinglePage: true }}
                loading={schedulesQuery.isLoading}
              />
            </Space>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}
