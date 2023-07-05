import { TimePicker } from "antd";
import { Dayjs } from "dayjs";

interface TimeSelectProps {
  onSelect: (time: Dayjs) => void;
  defaultValue: Dayjs;
  value: Dayjs;
}

export default function TimeSelect({
  onSelect,
  defaultValue,
  value,
}: TimeSelectProps) {
  return (
    <TimePicker
      minuteStep={15}
      hourStep={1}
      format="HH:mm"
      defaultValue={defaultValue}
      disabledTime={() => ({
        disabledHours: () => [0, 1, 2, 3, 4, 5, 20, 21, 22, 23, 24],
      })}
      hideDisabledOptions
      onSelect={onSelect}
      value={value}
    />
  );
}
