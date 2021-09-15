export const replaceKeyToValue = (message: string, values: any) => {
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
