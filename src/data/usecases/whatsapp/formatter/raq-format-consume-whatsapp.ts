import { FormatConsumeWhatsApp } from '../../../../domain/usecases/whatsapp';
import { Source } from '../../../../utils/enum/source';

export class RaqFormatConsumeWhatsApp implements FormatConsumeWhatsApp {
  format(params: any): FormatConsumeWhatsApp.Result {
    const [object] = params.data;

    if (object.message.type === 'TEXT') {
      return {
        message: object.message.messageText,
        msisdn: '5515976079352', // object.source,
        sourceId: Source.WHATSAPP,
      };
    }

    if (object.message.interactive.type === 'LIST_REPLY') {
      return {
        message: object.message.listReply.rowIdentifier,
        msisdn: '5515976079352', // object.source,
        sourceId: Source.WHATSAPP,
      };
    }

    return {
      message: object.message.payload,
      msisdn: '5515976079352', // object.source,
      sourceId: Source.WHATSAPP,
    };
  }
}
