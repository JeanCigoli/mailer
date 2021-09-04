import { addDays, subDays as dateFnsSubDays, format, isBefore } from 'date-fns';

export const sumDays = (date: Date, num: number) => {
  return addDays(date, num);
};

export const formatDate = (date: Date, design: string) => {
  return format(date, design);
};

export const subDays = (date: Date, num: number) => {
  return dateFnsSubDays(date, num);
};

export const isBeforeDate = (date: Date, dateCompare: Date) => {
  return isBefore(date, dateCompare);
};

export const convertDateNuageByDefault = (date: string | null) => {
  if (!date) {
    return null;
  }

  const regex =
    /(?<day>[0-9]{2})-(?<month>[0-9]{2})-(?<year>[0-9]{4}) (?<hour>.+)/;

  const groupDate = date.match(regex)?.groups;

  return `${groupDate?.year}-${groupDate?.month}-${groupDate?.day} ${groupDate?.hour}`;
};
