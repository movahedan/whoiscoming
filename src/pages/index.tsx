import React, { useState, useEffect } from "react";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
import {
  Typography,
  Slider,
  Button,
  Col,
  Row,
  Space,
  Card,
  message,
  Alert,
} from "antd";
import dayjs from "dayjs";

import { Calendar } from "@whoiscoming-ui/ui/organisms";
import { Layout } from "@whoiscoming-ui/ui/templates";
import type { SliderMarks } from "antd/es/slider";
import {
  useCreateScheduleMutation,
  useScheduleQuery,
  useRemoveScheduleMutation,
} from "./main/usemainRequests";

const { Title, Text } = Typography;
const marks: SliderMarks = {
  7: "07::00",
  8: "08::00",
  9: "09::00",
  10: "10::00",
  11: "11::00",
  12: "12::00",
  13: "13::00",
  14: "14::00",
  15: "15::00",
  16: "16::00",
  17: "17::00",
  18: "18::00",
};
interface IDate {
  day: number;
  month: number;
  year: number;
  startHour?: string;
  endHour?: string;
}
type UserId = string | null;
const queryClient = new QueryClient();

export default function Home() {
  const [hourRange, setHourRange] = useState<[number, number]>([0, 0]);
  const [imNotComing, setImNotComing] = useState(true);
  const [selectedDate, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [existingSchedule, setExistingSchedule] = useState(null);
  // const defaultRange: [number, number] = [9, 17];

  let userId: UserId = null;

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  const createScheduleMutation = useCreateScheduleMutation(userId || "");

  const onSave = (hourRange: [number, number]) => {
    createScheduleMutation.mutate({ selectedDate, hourRange });
    setImNotComing(hourRange[0] === 0);
  };

  const scheduleQuery = useScheduleQuery(userId || "");

  const setDayUserSchedule = (dateValue: string) => {
    if (dateValue && scheduleQuery.data) {
      const fullDate = dateValue.split("-");

      const scheduledItem = scheduleQuery.data.data.filter((item: IDate) => {
        if (
          item.day === Number(fullDate[2]) &&
          item.month === Number(fullDate[1]) &&
          item.year === Number(fullDate[0])
        ) {
          setHourRange([Number(item.startHour), Number(item.endHour)]);
          return true;
        }

        return false;
      });

      scheduledItem.length >= 1
        ? setExistingSchedule(scheduledItem)
        : setExistingSchedule(null);
    }
  };

  const onSelect = (value: string) => {
    setDate(value);
    setDayUserSchedule(value);
  };

  const removeSchedule = useRemoveScheduleMutation(userId || "");

  const handleRemove = () => {
    if (existingSchedule) removeSchedule.mutate(existingSchedule[0]);
  };

  const handleUpdateTime = () => {};

  useEffect(() => {
    setDayUserSchedule(selectedDate);
  }, [scheduleQuery.data]);

  return (
    <Layout>
      <Card>
        <Row>
          <Col span={12}>
            <Calendar dataTestId="modify-page-calendar" onSelect={onSelect} />
          </Col>
          <Col span={12}>
            {imNotComing ? (
              <Text>{"Not ganna be there"}</Text>
            ) : (
              <Text>{"I'm coming!"}</Text>
            )}
          </Col>
          <Col span={12}>
            <Title level={4} className="p-8">
              Choose time{" "}
            </Title>
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
                width: "90%",
                margin: "auto",
              }}
              direction="vertical"
            >
              <Slider
                range
                step={1}
                marks={marks}
                min={7}
                max={18}
                value={hourRange}
                onChange={(value) => setHourRange(value)}
              />
            </Space>
            <Space size="middle" className="p-8">
              <Button
                size="large"
                type="default"
                onClick={() => onSave([0, 0])}
              >
                {"I'm not going anywhere"}
              </Button>
              <Button
                size="large"
                type="default"
                onClick={() => onSave(hourRange)}
              >
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
          </Col>
        </Row>
        <Row>
          <Space size="middle">
            {scheduleQuery.isLoading ?? "Loading..."}

            {!!existingSchedule && (
              <>
                <Alert
                  message="You have booked a schedule on this day"
                  type="success"
                />

                <Button
                  size="large"
                  type="default"
                  onClick={handleUpdateTime}
                  disabled
                >
                  Update Time
                </Button>
                <Button
                  size="large"
                  danger
                  type="default"
                  onClick={handleRemove}
                  disabled={removeSchedule.isLoading}
                  loading={removeSchedule.isLoading}
                >
                  Remove
                </Button>
              </>
            )}

            {!existingSchedule && (
              <>
                <Button
                  size="large"
                  type="default"
                  onClick={() => onSave(hourRange)}
                  loading={createScheduleMutation.isLoading}
                  disabled={
                    createScheduleMutation.isLoading || !!existingSchedule
                  }
                >
                  Save
                </Button>
                <Button
                  size="large"
                  type="ghost"
                  onClick={() => setHourRange([8, 17])}
                  loading={createScheduleMutation.isLoading}
                  disabled={
                    createScheduleMutation.isLoading || !!existingSchedule
                  }
                >
                  Reset
                </Button>
              </>
            )}
          </Space>
        </Row>
      </Card>
    </Layout>
  );
}
