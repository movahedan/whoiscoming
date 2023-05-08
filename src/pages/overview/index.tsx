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
      age: 42,
      address: 'Amsterdam',
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
          <Col span={10}>
            <Text>Choose day</Text>
            <Calendar onPanelChange={onPanelChange} />
          </Col>
          <Col span={12}>
       
        <Space
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
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
            <Button size="large" disabled>Save</Button>
          </Space>
        </Row>
      </Card>
    </Layout>
  );
}
