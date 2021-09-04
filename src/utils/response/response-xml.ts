export const reduceArray = (array: Array<any> | any): any => {
  const result = array.map((value: any) => {
    if (typeof value !== 'object') return;

    return reduceXml(transformJsonInXml(value));
  });

  return result;
};

export const transformJsonInXml = (object: object | any): Array<any> => {
  const types = ['string', 'object', 'bigint', 'boolean', 'number'];
  const arrayXmlObjects = Object.entries(object).map(([key, value]) => {
    if (!types.includes(typeof value))
      return `<${key}>${reduceArray(value)}</${key}>`;

    if (typeof value === 'object')
      return `<${key}>${reduceXml(transformJsonInXml(value))}</${key}>`;

    return `<${key}>${value}</${key}>`;
  });

  // console.log({ arrayXmlObjects });

  return arrayXmlObjects;
};

export const reduceXml = (array: any[]): string => {
  const xmlResponse = array.reduce((acumulator, current) => {
    // console.log({ current });
    if (typeof current === 'object') {
      acumulator = acumulator + reduceXml(current);
      // console.log({ acumulator });

      return acumulator;
    }

    return (acumulator = acumulator + current);
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
