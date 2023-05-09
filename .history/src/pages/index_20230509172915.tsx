import React, { useState } from "react";
import { Typography, Slider, Button, Col, Row, Space, Card, Modal } from "antd";
import { Calendar } from "@whoiscoming-ui/ui/organisms";
import { Layout } from "@whoiscoming-ui/ui/templates";

import type { SliderMarks } from "antd/es/slider";

const { Title } = Typography;
const marks: SliderMarks = {
  7: "07:00",
  8: "08:00",
  9: "09:00",
  10: "10:00",
  11: "11:00",
  12: "12:00",
  13: "13:00",
  14: "14:00",
  15: "15:00",
  16: "16:00",
  17: "17:00",
  18: "18:00",
};

const getHoursForDateEndpointMock = () =>
  new Promise<[number, number]>((resolve) => {
    const startHour = Math.random() * 5 + 7;
    resolve([startHour, startHour + 4]);
  });

const submitHours = () => new Promise((resolve) => resolve(1));

export default function Home() {
  const [hourRange, setHourRange] = useState<[number, number]>([9, 17]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSave = () => submitHours();
  const onSelect = (value: string) => {
    console.log(value);
    getHoursForDateEndpointMock().then(setHourRange);
  };

  return (
    <Layout>
      <Card>
        <Row>
          <Col span={12}>
            <Calendar dataTestId="modify-page-calendar" onSelect={onSelect} />
          </Col>
          <Col span={12}>
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                padding: 8,
              }}
              direction="vertical"
              size={"large"}
            >
              <Title level={4}>Choose time </Title>
              <div
                style={{
                  display: "inline-block",
                  height: 460,
                  marginLeft: 48,
                }}
              >
                <Slider
                  vertical
                  range
                  step={1}
                  marks={marks}
                  reverse
                  min={7}
                  max={18}
                  value={hourRange}
                  onChange={(value) => setHourRange(value)}
                />
              </div>
              <Space size="middle">
                <Button size="large" type="default" onClick={onSave}>
                  Save
                </Button>
                <Button
                  size="large"
                  type="ghost"
                  onClick={() => setHourRange([0, 0])}
                >
                  Reset
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </Layout>
  );
}
