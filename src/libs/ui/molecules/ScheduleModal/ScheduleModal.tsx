import { Modal, Button, Col, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import TimeSelect from "../../atoms/TimeSelect/TimeSelect";

interface ScheduleModalProps {
  open: boolean;
  hideModal: () => void;
  handleOk: () => void;
  handleRemoveSchedule: () => void;
  existingSchedule: any;
  startHour: Dayjs;
  setStartHour: (hour: Dayjs) => void;
  endHour: Dayjs;
  setEndHour: (hour: Dayjs) => void;
}

export default function ScheduleModal({
  open,
  hideModal,
  handleOk,
  handleRemoveSchedule,
  existingSchedule,
  startHour,
  setStartHour,
  endHour,
  setEndHour,
}: ScheduleModalProps) {
  const modalFooter = [
    <Button key="submit" type="primary" onClick={handleOk}>
      {existingSchedule ? "Update" : "Save"}
    </Button>,
    <Button key="back" onClick={hideModal}>
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
        Remove
      </Button>
    );
  }

  let selectedDateSchedule = existingSchedule?.date
    ? dayjs(existingSchedule.date)
    : dayjs(); // Current date
  let formattedDate = selectedDateSchedule.format("D MMMM YYYY");

  return (
    <Modal
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
      <Col
        span={12}
        style={{ paddingLeft: 8, marginTop: 40, marginBottom: 40 }}
      >
        <Space
          style={{
            display: "flex",
          }}
          direction="horizontal"
        >
          From
          <TimeSelect
            onSelect={setStartHour}
            defaultValue={startHour}
            value={startHour}
          />
          to
          <TimeSelect
            onSelect={setEndHour}
            defaultValue={endHour}
            value={endHour}
          />
        </Space>
      </Col>
    </Modal>
  );
}
