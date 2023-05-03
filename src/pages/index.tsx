<<<<<<< HEAD
import React, { useState } from "react";
import { Typography, Col, Row, Space, Card, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

import { Calendar } from "@whoiscoming-ui/ui/organisms";
import { Layout } from "@whoiscoming-ui/ui/templates";
import {
  useCreateScheduleMutation,
  useScheduleQuery,
} from "./main/usemainRequests";
import useUserId from "./../libs/hooks/UserId";
import ScheduleModal from "../libs/ui/molecules/ScheduleModal/ScheduleModal";

type UserId = string | null;

export default function Home() {
  let currentTime = dayjs();
  let userId: UserId = useUserId();

  let nineAM = currentTime.set("hour", 9).set("minute", 0).set("second", 0);
  let sixPM = currentTime.set("hour", 18).set("minute", 0).set("second", 0);

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const [selectedDate, setDate] = useState<Dayjs>(currentTime);
  const [startHour, setStartHour] = useState<Dayjs>(nineAM);
  const [endHour, setEndHour] = useState<Dayjs>(sixPM);

  const createScheduleMutation = useCreateScheduleMutation(userId || "");

  const scheduleQuery = useScheduleQuery(userId || "");

  const existingSchedule = scheduleQuery?.data?.find(
    (item: any) =>
      dayjs(item.date).isSame(selectedDate, "day") &&
      item.status === "IN_OFFICE"
  );

  const onSelect = (value: string) => {
    setDate(dayjs(value));

    const existingItem = scheduleQuery?.data.find(
      (item: any) =>
        dayjs(item.date).isSame(value, "day") && item.status === "IN_OFFICE"
    );
    console.log("onSelect existingItem", existingItem);

    if (existingItem) {
      setStartHour(dayjs.unix(existingItem.startHour));
      setEndHour(dayjs.unix(existingItem.endHour));
    }
    showModal();
  };

  const handleOk = () => {
    createScheduleMutation.mutate({
      selectedDate: selectedDate.format("YYYY-MM-DD"),
      hourRange: [startHour?.unix() || 0, endHour?.unix() || 0],
      status: "IN_OFFICE",
    });

    setOpen(false);
  };

  const handleRemoveSchedule = () => {
    createScheduleMutation.mutate({
      selectedDate: selectedDate.format("YYYY-MM-DD"),
      hourRange: [startHour?.unix() || 0, endHour?.unix() || 0],
      status: "OUT_OF_OFFICE",
    });

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const modalFooter = [
    <Button key="submit" type="primary" onClick={() => handleOk()}>
      {existingSchedule ? "Update" : "Save"}
    </Button>,
    <Button key="back" onClick={handleCancel}>
      Cancel
    </Button>,
  ];

  if (existingSchedule) {
    modalFooter.push(
      <Button
        key="danger"
        onClick={handleRemoveSchedule}
        danger
        icon={<DeleteOutlined />}
      >
        Remove this schedule
      </Button>
    );
  }

  return (
    <Layout>
      <Card>
        <Row justify="center">
          <Col xs={24} sm={24} md={20} lg={10} xl={10}>
            <Typography.Title level={5}>
              Click on calendar to manage office day
            </Typography.Title>
            <Calendar
              dataTestId="modify-page-calendar"
              onSelect={onSelect}
              highlightedDays={
                scheduleQuery.isLoading
                  ? []
                  : scheduleQuery?.data?.filter(
                      (x: any) => x.status !== "OUT_OF_OFFICE"
                    )
              }
            />
          </Col>

          <ScheduleModal
            open={open}
            hideModal={() => setOpen(false)}
            handleOk={handleOk}
            handleRemoveSchedule={handleRemoveSchedule}
            existingSchedule={existingSchedule}
            startHour={startHour}
            setStartHour={setStartHour}
            endHour={endHour}
            setEndHour={setEndHour}
          />
          {/* <Modal
            title={
              existingSchedule
                ? "Update office hours: " + formattedDate
                : "Confirm  time in the office: " + formattedDate
            }
            open={open}
            onOk={hideModal}
            onCancel={hideModal}
            cancelText="Cancel"
            footer={modalFooter}
          >
            <Col span={12} style={{ paddingLeft: 8 }}>
              <Space
                style={{
                  display: "flex",
                }}
                direction="horizontal"
              >
                From
                <TimePicker
                  minuteStep={15}
                  hourStep={1}
                  format="HH:mm"
                  defaultValue={startHour ?? nineAM}
                  value={startHour}
                  disabledTime={() => ({
                    disabledHours: () => [0, 1, 2, 3, 4, 5, 20, 21, 22, 23, 24],
                  })}
                  hideDisabledOptions
                  onSelect={(time) => {
                    setStartHour(time);
                  }}
                />
                to
                <TimePicker
                  minuteStep={15}
                  hourStep={1}
                  format="HH:mm"
                  defaultValue={endHour ?? sixPM}
                  disabledTime={() => ({
                    disabledHours: () => [0, 1, 2, 3, 4, 5, 20, 21, 22, 23, 24],
                  })}
                  hideDisabledOptions
                  onSelect={(time) => setEndHour(time)}
                />
              </Space>
            </Col>
          </Modal> */}
        </Row>
        <Row>
          <Space size="middle">{scheduleQuery.isLoading ?? "Loading..."}</Space>
        </Row>
      </Card>
    </Layout>
  );
=======
import { homepageContent } from '@whoiscoming-ui/contents/home-page';
import { Footer } from '@whoiscoming-ui/ui/molecules';
import { Layout } from '@whoiscoming-ui/ui/templates';

export default function Home() {
  return <Layout footer={<Footer />}>{homepageContent.title}</Layout>;
>>>>>>> 78634c5 (Basic setup:)
}
