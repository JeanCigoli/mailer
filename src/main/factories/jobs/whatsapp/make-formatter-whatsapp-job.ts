import { RaqFormatConsumeWhatsApp } from '../../../../data/usecases/whatsapp';
import { FormatConsumeWhatsAppJob } from '../../../jobs/whatsapp';

export const makeFormatterWhatsApp = () => {
  const raqFormatConsumeWhatsApp = new RaqFormatConsumeWhatsApp();

  return new FormatConsumeWhatsAppJob(raqFormatConsumeWhatsApp);
};
