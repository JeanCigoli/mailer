export const replaceKeyToValue = (message: string, values: any) => {
  if (!message) {
    return message;
  }

  Object.entries(values).map(([key, value]: [string, any]) => {
    if (typeof value === 'object') {
      message = replaceKeyToValue(message, value);
    }

    message = message.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });

  return message;
};
