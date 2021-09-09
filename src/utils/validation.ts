import {
  ValidCardNumber,
  ValidAndFormatMsisdn,
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
