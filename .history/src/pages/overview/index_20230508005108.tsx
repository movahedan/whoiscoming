import type { Dayjs } from "dayjs";
import React from "react";
import { Layout } from "@whoiscoming-ui/ui/templates";
import {
  Typography,
  Slider,
  Button,
  Col,
  Row,
  Space,
  Card,
  Calendar,
} from "antd";
import type { SliderMarks } from "antd/es/slider";

const style: React.CSSProperties = {
  display: "inline-block",
  height: 300,
  marginLeft: 70,
};
const { Text } = Typography;
 
const onPanelChange = (value: Dayjs, mode: any) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

export default function Overview() {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: 'Eindhoven',
    },
    {
      key: '2',
      name: 'John',
      age: 42,Amsterdam10 Downing Street',
    },
  ];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Office',
    dataIndex: 'address',
    key: 'address',
  },
];

  return (
    <Layout>
      <Card>
        <Row>
          <Col span={12}>
            <Text>Choose day</Text>
            <Calendar onPanelChange={onPanelChange} />
          </Col>
          <Col span={12}>
       
        <Space
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
            direction="vertical"
          >
           
            </Space>
          </Col>
        </Row>
        <Row>

          <Space
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button size="large" disabled>Save</Button>
          </Space>
        </Row>
      </Card>
    </Layout>
  );
}