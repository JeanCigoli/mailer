export const makeMsisdnMask = (msisdn: string, pattern: string) => {
  const number = msisdn.replace('55', '');

  let i = 0;

  return pattern.replace(/#/g, () => number[i++] || '');
};
