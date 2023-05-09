 
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import React from 'react';
import { Layout } from "@whoiscoming-ui/ui/templates";
import { DatePicker, Slider, Button, Col, Row, Space, Card , Calendar, theme } from "antd";
import type { SliderMarks } from "antd/es/slider";

const style: React.CSSProperties = {
  display: "inline-block",
  height: 300,
  marginLeft: 70,
};

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

export default function Home() {
  return (
    <Layout>
      <Card>
        <Row>
          <Col span={12}>
            <DatePicker inputReadOnly  open/>
          </Col>
          <Col span={12}>
            {" "}
            <div style={style}>
              <Slider
                vertical
                range
                step={1}
                marks={marks}
                reverse
                min={7}
                max={18}
                defaultValue={[9, 17]}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Space wrap>
              <Button size="large">Save</Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}