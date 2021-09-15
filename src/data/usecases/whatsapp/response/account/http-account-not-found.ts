import { AccountNotFound } from '../../../../../domain/usecases/whatsapp';
import { makeMsisdnMask } from '../../../../../utils/mask';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { ListCredentialByServiceAndMvno } from '../../../../protocols/core/db';
import { TransformCredentials } from '../../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../../protocols/whatsapp/http';

export class HttpAccountNotFound implements AccountNotFound {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
  ) {}

  async notFound(params: AccountNotFound.Params): AccountNotFound.Result {
    const destinations = [
      {
        correlationId: new Date().getTime(),
        destination: '5511971314531',
      },
    ];

    const base64 = await this.listCredentialByServiceAndMvno.findByService({
      mvnoId: 2,
      service: 'WHATSAPP',
    });

    const { messages, ...props } = params;
    props.msisdn = makeMsisdnMask(props.msisdn, '(##) #####-####');

    const credentials = this.transformCredentials(base64.credentials);

    for await (const message of messages) {
      const body = {
        destinations: destinations,
        message: {
          messageText: replaceKeyToValue(message, props),
        },
      };

      await this.sendMessageWhatsApp.send({
        body,
        credentials,
      });
    }

    return;
  }
}
