import * as _ from 'lodash';

export const replaceKeyToValue = (message: string | any, values: any) => {
  // console.log({ message, values });

  if (_.isEmpty(values)) {
    return message;
  }

  if (!message) {
    return message;
  }

  Object.entries(values).map(([key, value]: [string, any]) => {
    if (Array.isArray(value)) {
      value.map((data) => {
        message = replaceKeyToValue(message, data);
        return;
      });

      return;
    }

    if (value instanceof Date) {
      message = message.replace(
        new RegExp(`{{${key}}}`, 'g'),
        value.toLocaleDateString(),
      );
      return;
    }

    if (typeof value === 'object') {
      message = replaceKeyToValue(message, value);
      return;
    }

    message = message.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });

  return message;
};
