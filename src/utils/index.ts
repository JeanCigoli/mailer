export function toInt(value: string) {
  return parseInt(value, 10) || 0;
}

export function toString(value: number): string {
  return value.toString();
}

export const promise = async (number: number) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      return resolve(null);
    }, number);
  });
};

export function makeError(param: string, message: string) {
  return [
    {
      message,
      param,
    },
  ];
}

export function parseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error('INVALID_JSON');
  }
}

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const transactionId = () =>
  `${Date.now()}:${getRandomInt(0, 999999).toString().padStart(6, '0')}`;

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const makeObjectToParamsRequest = (props: any) => {
  return Object.entries(props)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export const removedSymbols = (text: string) => {
  return text.replace(/[^a-zA-Z]/g, '').toLowerCase();
};

export const removedAccent = (text: string) => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
