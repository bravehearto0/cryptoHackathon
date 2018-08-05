import { format as formatD } from 'date-fns';

export const millisecondFormat = 'T';
export const dateFormat = 'YYYY-MM-dd HH:mm:ss z';
export const newDate = () => new Date();
export const format = (date, formatStr = dateFormat) => formatD(date, formatStr);
export const now = (formatStr = dateFormat) => format(newDate(), formatStr);
