import {
  Typography,
  Col,
  Row,
  Calendar as AntCalendar,
  Select,
  Button,
} from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { classNames, formatDate } from '@whoiscoming-ui/utilities';

import styles from './Calendar.module.css';

import type { CalendarProps as AntCalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CSSProperties } from 'react';

export type CalendarProps = {
  dataTestId: string;
  as?: keyof HTMLElementTagNameMap;
  style?: CSSProperties;
  className?: string;

  onPanelChange?: AntCalendarProps<Dayjs>['onPanelChange'];
  onSelect?: (date: string) => void;
};

export const Calendar = ({
  as: As = 'div',
  dataTestId = 'Calendar',
  style,
  className,
  onSelect,
  onPanelChange,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const handleSelect = (date: Dayjs) => {
    setCurrentDate(date);
    onSelect?.(formatDate(date));
  };

  return (
    <As
      data-testid={dataTestId}
      style={style}
      className={classNames([styles.wrapper, className])}
    >
      <AntCalendar
        mode='month'
        fullscreen={false}
        value={currentDate}
        onSelect={handleSelect}
        onPanelChange={onPanelChange}
        headerRender={({ value, onChange }) => {
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
              <Select.Option key={i} value={i} className='month-item'>
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
              <Typography.Title level={4}>Choose day</Typography.Title>
              <Row gutter={8}>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    className='my-year-select'
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {yearOptions.map((i) => (
                      <Select.Option key={i} value={i} className='year-item'>
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
                    data-testid='calendar-today-button'
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
    </As>
  );
};
