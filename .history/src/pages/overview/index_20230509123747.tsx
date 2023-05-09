import type { Dayjs } from "dayjs";
import React from "react";
import { Layout } from "@whoiscoming-ui/ui/templates";
import {
  Typography,
  Table,
  Button,
  Col,
  Row,
  Space,
  Card,
  Calendar,
} from "antd";
import { useQuery } from "@tanstack/react-query";

const { Text } = Typography;
interface IDate {
  day: number;
  month: number;
  year: number;
}
export default function Overview() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "Eindhoven",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "Amsterdam",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Office",
      dataIndex: "address",
      key: "address",
    },
  ];
  const [selectedDay, setSelectedDay] = React.useState<IDate>({
    day: 0,
    month: 1,
    year: 2023,
  });

  const query = useQuery({
    queryKey: ["whoiscoming", selectedDay],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3000/schedules/" +
          selectedDay.day +
          "/" +
          selectedDay.month +
          "/" +
          selectedDay.year
      );
      const jsonData = await response.json();
      return jsonData;
    },
  });

  const onPanelChange = (value: Dayjs, mode: any) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const onDaySelect = (value: Dayjs) => {
    console.log(value.format("YYYY-MM-DD"));
    const fullDate = value.format("YYYY-MM-DD").split("-");
    setSelectedDay({ day: 1, month: 1, year: fullDate[0] });
  };

  console.log(query);

  return (
    <Layout>
      <Card>
        <Row>
          <Col span={10}>
            <Text>Choose day</Text>
            <Calendar onPanelChange={onPanelChange} onSelect={onDaySelect} />
          </Col>
          <Col span={12}>
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              direction="vertical"
            >
              <Table dataSource={dataSource} columns={columns} />;
            </Space>
          </Col>
        </Row>
        <Row>
          <Space
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button size="large" disabled>
              Save
            </Button>
          </Space>
        </Row>
      </Card>
    </Layout>
  );
}
