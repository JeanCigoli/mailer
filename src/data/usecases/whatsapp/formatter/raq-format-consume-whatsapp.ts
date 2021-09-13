import { FormatConsumeWhatsApp } from '../../../../domain/usecases/whatsapp';
import { Source } from '../../../../utils/enum/source';

export class RaqFormatConsumeWhatsApp implements FormatConsumeWhatsApp {
  format(params: any): FormatConsumeWhatsApp.Result {
    if (params.data[0].message.type === 'TEXT') {
      return {
        message: params.data[0].message.messageText,
        msisdn: params.data[0].source,
        sourceId: Source.WHATSAPP,
      };
    }

    if (params.data[0].message.interactive.type === 'LIST_REPLY') {
      return {
        message: params.data[0].message.listReply.rowIdentifier,
        msisdn: params.data[0].source,
        sourceId: Source.WHATSAPP,
      };
    }

    return {
      message: params.data[0].message.payload,
      msisdn: params.data[0].source,
      sourceId: Source.WHATSAPP,
    };
  }
}
