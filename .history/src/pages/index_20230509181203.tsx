import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
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
} from "antd";
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

type RequiredMark = boolean | "optional";

export default function Home() {
  const [hourRange, setHourRange] = useState<[number, number]>([9, 17]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [form] = Form.useForm();

  console.log(email, userId);

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
      },
      onError: (error: any) => {
        console.error("Error creating user:", error);
      },
    }
  );

  const schedule = useMutation(
    (user: any) => {
      const URL = `http://localhost:3000/schedule/`;

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };

      return fetch(URL, options);
    },
    {
      onSuccess: (data: any) => {
        console.log("User created successfully:", data);
      },
      onError: (error: any) => {
        console.error("Error creating user:", error);
      },
    }
  );

  const onSave = () => {
    schedule.mutate({});
  };

  const onFinish = (values: any) => {
    console.log("Form submitted with values:", values);
    userMutation.mutate(values);
    localStorage.setItem("email", values.email);
    setIsModalOpen(false);
  };

  const onSelect = (value: string) => {
    console.log(value);
    getHoursForDateEndpointMock().then(setHourRange);
  };

  React.useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUserId = localStorage.getItem("userId");

    if (!storedEmail || !storedUserId) {
      showModal();
    } else {
      setEmail(storedEmail);
      setUserId(storedUserId);
    }
  }, []);

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
