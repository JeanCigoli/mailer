const filterObject = (params: object | any, key: string): string | null => {
  if (!params[key] && typeof params === 'object') {
    const value: any = Object.values(params).find((current) => current);

    return filterObject(value, key);
  }

  return params[key];
};

const replaceKeyToValue = (text: string, values: object | any): string => {
  const textArray = text.split(' ').map((value) => {
    if (value.startsWith('{{')) {
      const key = value.replace('{{', '').replace('}}', '').replace(/\W|_/, '');

      if (!values[key]) {
        const objValues: any = Object.values(values).find((current) =>
          filterObject(current, key),
        );

        return filterObject(objValues, key);
      }

      return values[key];
    }

    return value;
  });

  const newText = textArray.join(' ');

  return newText;
};
