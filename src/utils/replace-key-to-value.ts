export const replaceKeyToValue = (
  text: string,
  values: object | any,
): string => {
  const textArray = text.split(' ').map((value) => {
    if (value.startsWith('{{') && value.endsWith('}}')) {
      const key = value.replace('{{', '').replace('}}', '');
      return values[key];
    }

    return value;
  });

  const newText = textArray.join(' ');

  return newText;
};
