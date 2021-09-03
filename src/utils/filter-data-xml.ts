export const filterDataXml = (object: any) => {
  if (!object) {
    return null;
  }

  const result = Object.entries(object).map(([key, value]) => {
    const [_, newKey] = key.split(':');
    return [newKey, value];
  });

  return Object.fromEntries(result);
};

export const reduceObject = (object: any): any => {
  return Object.entries(object).reduce((accumulator: any, current): any[] => {
    const [key, value] = current;

    if (/Body|body/gm.test(key)) {
      const data = filterDataXml(value);
      return { ...accumulator, ...data };
    }

    if (!value) return accumulator;

    if (typeof value === 'object') {
      const data = reduceObject(value);
      return { ...accumulator, ...data };
    }

    return accumulator;
  }, {});
};

export const recursiveFilter = (object: any) => {
  const [result] = Object.entries(object).map(([key, value]) => {
    if (typeof value === 'object') {
      return reduceObject(value);
    }
  });

  return result;
};
