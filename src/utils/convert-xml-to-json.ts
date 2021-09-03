import convert from 'xml-js';
import { recursiveDataConvertFilterLayer } from './object/formatter/recursive-data-converter';

export const keyBasedUnzipFormatter = (data: object) => {
  if (!data) return;
  return Object.entries(data).reduce((accumulator, currentValue) => {
    const [key, value]: any[] = currentValue;

    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return { ...accumulator, [key]: null };
    }

    if (typeof value === 'string') {
      return { ...accumulator, [key]: value };
    }

    if (Reflect.has(value, 'value')) {
      return { ...accumulator, [key]: value?.value };
    }

    return { ...accumulator, [key]: value };
  }, {});
};

export const convertXmlToJson = (xml: string) => {
  const jsonString = convert.xml2json(xml, {
    compact: true,
    spaces: 4,
    textKey: 'value',
    cdataKey: 'value',
    ignoreDeclaration: true,
    alwaysChildren: false,
  });

  const json = JSON.parse(jsonString);

  return recursiveDataConvertFilterLayer(json, keyBasedUnzipFormatter);
};
