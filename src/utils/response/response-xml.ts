export const reduceArray = (array: Array<any> | any): any => {
  const result = array.map((value: any) => {
    if (typeof value !== 'object') return;

    return reduceXml(transformJsonInXml(value));
  });

  return result;
};

export const transformArray = (value: string[]) => {
  return `${value.length}-${value.map((data) => data).join(';')}`;
};

export const transformJsonInXml = (object: object | any): Array<any> => {
  const arrayXmlObjects = Object.entries(object).map(([key, value]) => {
    if (!key) key = 'value';

    if (Array.isArray(value)) {
      return `<${key}>${transformArray(value)}</${key}>`;
    }

    if (typeof value === 'object')
      return `<${key}>${reduceXml(transformJsonInXml(value))}</${key}>`;

    return `<${key}>${value}</${key}>`;
  });

  return arrayXmlObjects;
};

export const reduceXml = (array: any[]): string => {
  const xmlResponse = array.reduce((accumulator, current) => {
    if (typeof current === 'object') {
      accumulator = accumulator + '\n' + reduceXml(current);

      return accumulator;
    }

    return (accumulator = accumulator + '\n' + current);
  });

  return xmlResponse;
};

export const makeResponseXml = (object: object) => {
  const response =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    reduceXml(transformJsonInXml(object)) +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';
  return response;
};
