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
  Modal,
  Form,
  Input,
  message,
  Alert,
} from "antd";
import dayjs from "dayjs";

import { Calendar } from "@whoiscoming-ui/ui/organisms";
import { Layout } from "@whoiscoming-ui/ui/templates";
import type { SliderMarks } from "antd/es/slider";

const { Title, Text } = Typography;
const marks: SliderMarks = {
  7: "07",
  8: "08",
  9: "09",
  10: "10",
  11: "11",
  12: "12",
  13: "13",
  14: "14",
  15: "15",
  16: "16",
  17: "17",
  18: "18",
};
interface IDate {
  day: number;
  month: number;
  year: number;
  startHour?: string;
  endHour?: string;
}

const queryClient = new QueryClient();


export default function Home() {
  const [hourRange, setHourRange] = useState<[number, number]>([0, 0]);
  const [imNotComing, setImNotComing] = useState(true);
  const [selectedDate, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [existingSchedule, setExistingSchedule] = useState(null);
  const defaultRange: [number, number] = [9, 17];

  const createScheduleMutation = useMutation(
    () => {
      const URL = `http://localhost:3000/schedules`;
      const date = selectedDate.split("-");
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          day: Number(date[2]),
          month: Number(date[1]),
          year: Number(date[0]),
          startHour: hourRange[0],
          endHour: hourRange[1],
        }),
      };

      return fetch(URL, options);
    },
    {
      onSuccess: () => {
        message.success("Schedule created successfully");
        queryClient.invalidateQueries({
          queryKey: ["schedules", "schedules/user/"],
        });
      },
      onError: () => {
        message.error("Error creating schedule");
      },
    }
  );

  const onSave = (hourRange: [number, number]) => {
    createScheduleMutation.mutate();
    setImNotComing(hourRange[0] === 0);
  };

  
  const scheduleQuery = useQuery({
    queryKey: ["schedules/user/", userId],
    queryFn: () =>
      fetch("http://localhost:3000/schedules/user/" + userId, {
        method: "GET",
      }).then((res) => res.json()),
    enabled: !!userId,
  });

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

  const removeSchedule = useMutation(
    (item: any) => {
      const { day, month, year } = item;

      const URL = `http://localhost:3000/schedules/${userId}/${day}/${month}/${year}`;
      const options = {
        method: "DELETE",
      };

      return fetch(URL, options);
    },
    {
      onSuccess: () => {
        message.success("Schedule removed successfully");
        queryClient.invalidateQueries({
          queryKey: ["schedules/user/", userId],
        });
      },
      onError: () => {
        message.error("Error deleting schedule");
      },
    }
  );

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
              <Text>{'Not ganna be there'}</Text>
            ) : (
              <Text>{"I'm coming!"}</Text>
            )}
          </Col>
          <Col span={12}>
            <Title level={4} className='p-8'>
              Choose time{' '}
            </Title>
            <Space
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '90%',
                margin: 'auto',
              }}
              direction='vertical'
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
            <Space size='middle' className='p-8'>
              <Button
                size='large'
                type='default'
                onClick={() => onSave([0, 0])}
              >
                {"I'm not going anywhere"}
              </Button>
              <Button
                size='large'
                type='default'
                onClick={() => onSave(hourRange)}
              >
                Save
              </Button>
              <Button
                size='large'
                type='ghost'
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

            {existingSchedule && (
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
