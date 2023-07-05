import {
  Col,
  Row,
  Calendar as AntCalendar,
  Select,
  Button,
  CalendarProps as AntCalendarProps,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { classNames, formatDate } from "@whoiscoming-ui/utilities";
import styles from "./Calendar.module.css";
import type { Dayjs } from "dayjs";
import type { CSSProperties } from "react";

interface ScheduleItem {
  date: string;
  startHour: string;
  endHour: string;
}

export type CalendarProps = {
  dataTestId: string;
  as?: keyof HTMLElementTagNameMap;
  style?: CSSProperties;
  className?: string;

  onPanelChange?: AntCalendarProps<Dayjs>["onPanelChange"];
  onSelect?: (date: string) => void;
  highlightedDays: ScheduleItem[];
};

export const Calendar = ({
  // as: As = "div",
  dataTestId = "Calendar",
  style,
  className,
  onSelect,
  onPanelChange,
  highlightedDays,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const dateCellRender = (date: any) => {
    const dateString = date.format("YYYY-MM-DD");

    const matchingItem = highlightedDays.find((x) =>
      x.date?.includes(dateString)
    );

    if (matchingItem) {
      return (
        <div
          className="highlighted-day"
          style={{
            background: "rgb(139 219 161)",
            width: "24px",
            height: "24px",
            position: "absolute",
            top: 0,
            zIndex: -1,
            borderRadius: "50%",
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            console.log("double", e);
          }}
        ></div>
      );
    }
  };

  const handleSelect = (date: Dayjs) => {
    setCurrentDate(date);
    onSelect?.(formatDate(date));
  };

  return (
    <div
      data-testid={dataTestId}
      style={style}
      className={classNames([styles.wrapper, className, "my-calendar"])}
    >
      <AntCalendar
        mode="month"
        fullscreen={false}
        value={currentDate}
        onSelect={handleSelect}
        onPanelChange={onPanelChange}
        cellRender={dateCellRender}
        headerRender={({ value, onChange }: { value: any; onChange: any }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          const year = value.year();
          const currentYear = new Date().getFullYear();
          const yearOptions = [currentYear, currentYear + 1, currentYear + 2];
          const month = value.month();

          return (
            <div style={{ padding: 8 }}>
              <Row gutter={8}>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {yearOptions.map((i) => (
                      <Select.Option key={i} value={i} className="year-item">
                        {i}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
                <Col>
                  <Button
                    data-testid="calendar-today-button"
                    onClick={() => handleSelect(dayjs())}
                  >
                    Today
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }}
      />
    </div>
  );
};
