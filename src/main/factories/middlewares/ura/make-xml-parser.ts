import { DbXmlParser } from '../../../../data/usecases/ura/middleware/db-xml-parser';
import { XmlParserMiddleware } from '../../../../presentation/middlewares/xml-parser-middleware';
import { convertXmlToJson } from '../../../../utils/convert-xml-to-json';

export const makeXmlParser = () => {
  const dbXmlParser = new DbXmlParser(convertXmlToJson);
  return new XmlParserMiddleware(dbXmlParser);
};
