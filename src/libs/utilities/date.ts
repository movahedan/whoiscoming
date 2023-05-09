import type { Dayjs } from 'dayjs';

export const dateFormat = 'YYYY-MM-DD';
export const formatDate = (date: Dayjs) => date.format(dateFormat);
