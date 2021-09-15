import { isAfter } from 'date-fns';
import {
  ValidCardNumber,
  ValidAndFormatMsisdn,
  ValidCardValidity,
  ValidSecurityCode,
} from '../data/protocols/core/utils';

export const validAndFormatterMsisdn: ValidAndFormatMsisdn = (
  value: string,
) => {
  const replace = value.replace(/([^\d])+/gim, '');
  const msisdn = replace.length === 11 ? `55${replace}` : replace;

  if (!/^(55\d{11})$|^(55\d{10})$/.test(msisdn)) {
    return {
      msisdn,
      status: false,
    };
  }

  return {
    msisdn,
    status: true,
  };
};

export const validCardNumber: ValidCardNumber = (number: string) => {
  if (!/^\d+$/g.test(number)) {
    return false;
  }

  const sumArray = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 2, 4, 6, 8, 1, 3, 5, 7, 9],
  ];

  let sum = 0,
    flip = 0;

  for (let i = number.length - 1; i >= 0; i--) {
    sum += sumArray[flip++ & 0x1][+number.charAt(i)];
  }

  return sum % 10 == 0;
};

export const validValidityCard: ValidCardValidity = (validity: string) => {
  const isLengthValidity = (date: string) => {
    const values = date.split('/');

    if (values.length < 2) {
      return [date.slice(0, 2), date.slice(2, 4)];
    }

    return values;
  };

  if (!/^([0-9]{2})\/([0-9]{2})$|^([0-9]{4})$/.test(validity)) {
    return {
      status: false,
      validity: validity,
    };
  }

  const [month, year] = isLengthValidity(validity);
  const date = new Date(+`20${year}`, +month, 1);
  const now = new Date();

  return {
    status: isAfter(date, now),
    validity: `${month}${year}`,
  };
};

export const validateSecurityCode: ValidSecurityCode = (code: string) => {
  if (!/^([0-9]{3})$|^([0-9]{4})$/.test(code)) {
    return {
      status: false,
      code: code,
    };
  }

  return {
    status: true,
    code: code,
  };
};
