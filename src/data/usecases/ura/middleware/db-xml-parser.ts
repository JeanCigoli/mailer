import { XmlParser } from '../../../../domain/usecases/ura';
import { Source } from '../../../../utils/enum/source';
import { recursiveFilter } from '../../../../utils/filter-data-xml';
import { ConvertXmlToJson } from '../../../protocols/ura/utils';

export class DbXmlParser implements XmlParser {
  constructor(private readonly convertXmlToJson: ConvertXmlToJson) {}
  convert(params: XmlParser.Params): XmlParser.Result {
    const body = this.convertXmlToJson(params.body);

    return {
      body: {
        ...recursiveFilter(body),
        sourceId: Source.URA,
      },
    };
  }
}