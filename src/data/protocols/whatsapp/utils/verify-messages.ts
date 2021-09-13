import { VerifyMessage } from '../../../../utils/verify-message-whatsapp';

export type VerifyMessages = (
  first: string,
  second: string | null,
) => VerifyMessage;
