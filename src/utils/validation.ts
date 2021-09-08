import { ValidAndFormatMsisdn } from '../data/protocols/core/utils/valid-and-format-msisdn';

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
