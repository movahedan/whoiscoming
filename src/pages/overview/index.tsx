import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import { Layout } from "@whoiscoming-ui/ui/templates";
import { Table, Col, Row, Space, Card } from "antd";

import { Calendar } from "@whoiscoming-ui/ui/organisms";
import { useSchedulesQuery } from "./useOverviewRequests";
import {
  useCurrentUserQuery,
  useGetCampuses,
} from "../preferences/usePreferencesRequests";

export default function Overview() {
  let userId: string | null = null;

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  const [selectedDate, setSelectedDay] = useState(dayjs().format("YYYY-MM-DD"));
  const campusesQuery = useGetCampuses();

  const schedulesQuery = useSchedulesQuery(
    selectedDate,
    campusesQuery.data || []
  );

  const onDaySelect = (value: string) => {
    setSelectedDay(value);
  };
  const currentUserQuery = useCurrentUserQuery(userId);
  const user = currentUserQuery.data || {};

  const currentUserCampus = campusesQuery?.data?.find(
    (x: any) => x.id === user.campus
  )?.name;

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
  ];

  return (
    <Layout>
      <Card>
        <Row justify="center">
          <Col
            xs={24}
            sm={24}
            md={20}
            lg={10}
            xl={10}
            style={{ padding: "16px" }}
          >
            <Calendar
              dataTestId="overview-page-calendar"
              onSelect={onDaySelect}
              highlightedDays={[]}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={20}
            lg={10}
            xl={10}
            style={{ padding: "16px" }}
          >
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
