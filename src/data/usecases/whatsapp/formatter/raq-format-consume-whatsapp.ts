import { FormatConsumeWhatsApp } from '../../../../domain/usecases/whatsapp';
import { Source } from '../../../../utils/enum/source';

export class RaqFormatConsumeWhatsApp implements FormatConsumeWhatsApp {
  format(params: any): FormatConsumeWhatsApp.Result {
    console.log(params);

    return {
      message: 'Olá',
      msisdn: '5515976079352',
      sourceId: Source.WHATSAPP,
    };
  }
}
