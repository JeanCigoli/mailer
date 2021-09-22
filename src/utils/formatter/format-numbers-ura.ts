const splitNumber = (numbers: string) => {
  return numbers.split('');
};

export const formatNumberToUra = (number: string) => {
  const numbers = splitNumber(number);

  return {
    length: numbers.length,
    data: numbers.map((value) => `numero0${value}.wav`).join(';'),
  };
};
