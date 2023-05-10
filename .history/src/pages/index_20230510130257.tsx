import React, { useState } from "react";
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

type RequiredMark = boolean | "optional";
const queryClient = new QueryClient();

export default function Home() {
  const [hourRange, setHourRange] = useState<[number, number]>([9, 17]);
  const [selectedDate, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userId, setUserId] = useState("");
  const [existingSchedule, setExistingSchedule] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>("optional");

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const userMutation = useMutation(
    (values: any) => {
      const { user } = values;
      const URL = `http://localhost:3000/users`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };

      return fetch(URL, options);
    },
    {
      onSuccess: async (data: any) => {
        const result = await data.json();
        localStorage.setItem("userId", result["_id"]);
        localStorage.setItem("email", result["email"]);
        message.success("User created successfully");
      },
      onError: () => {
        message.error("User not created");
      },
    }
  );

  const createSchedule = useMutation(
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
          queryKey: ["schedules", userId],
        });
      },
      onError: () => {
        message.error("Error creating schedule");
      },
    }
  );

  const onSave = () => {
    createSchedule.mutate();
  };

  const onFinish = (values: any) => {
    userMutation.mutate(values);
    localStorage.setItem("email", values.email);
    setIsModalOpen(false);
  };

  const scheduleQuery = useQuery({
    queryKey: ["schedules/user/", userId],
    queryFn: () =>
      fetch("http://localhost:3000/schedules/user/" + userId, {
        method: "GET",
      }).then((res) => res.json()),
    enabled: !!userId,
  });

  const checkSetExistingSchedule = (dateValue: string) => {
    console.log({ selectedDate, userId }, dateValue, scheduleQuery.data);

    if (dateValue && scheduleQuery.data) {
      const fullDate = dateValue.split("-");

      const scheduledItem = scheduleQuery.data.data.filter((item: any) => {
        if (
          item.day === Number(fullDate[2]) &&
          item.month === Number(fullDate[1]) &&
          item.year === Number(fullDate[0])
        ) {
          setHourRange([Number(item.startHour), Number(item.endHour)]);
          return true;
        }
      });

      scheduledItem.length >= 1
        ? setExistingSchedule(scheduledItem)
        : setExistingSchedule(null);
    }
  };

  const onSelect = (value: string) => {
    setDate(value);
    checkSetExistingSchedule(value);
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

  React.useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUserId = localStorage.getItem("userId");

    if (!storedEmail || !storedUserId) {
      showModal();
    } else {
      setUserId(storedUserId);
    }
  }, []);

  React.useEffect(() => {
    if (userId) {
      scheduleQuery.refetch();
    }
  }, [userId]);

  React.useEffect(() => {
    console.info(selectedDate, userId);
    if (selectedDate && scheduleQuery.data) {
      checkSetExistingSchedule(selectedDate);
    }
  }, [selectedDate]);
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
                  onClick={onSave}
                  loading={createSchedule.isLoading}
                  disabled={createSchedule.isLoading || !!existingSchedule}
                >
                  Save
                </Button>
                <Button
                  size="large"
                  type="ghost"
                  onClick={() => setHourRange([8, 17])}
                  loading={createSchedule.isLoading}
                  disabled={createSchedule.isLoading || !!existingSchedule}
                >
                  Reset
                </Button>
              </>
            )}
          </Space>
        </Row>
      </Card>

      <Modal
        title="Enter your information"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ requiredMarkValue: requiredMark }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item
            label="Full name"
            required
            tooltip="This is a required field"
            name={["user", "name"]}
          >
            <Input placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            rules={[{ type: "email" }]}
            label="Email"
            required
            tooltip="This is a required field"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
