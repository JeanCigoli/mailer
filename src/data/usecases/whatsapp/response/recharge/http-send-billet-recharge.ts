import { format } from 'date-fns';
import { SendBilletRecharge } from '../../../../../domain/usecases/whatsapp';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { ListCredentialByServiceAndMvno } from '../../../../protocols/core/db';
import { TransformCredentials } from '../../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../../protocols/whatsapp/http';

export class HttpSendBilletRecharge implements SendBilletRecharge {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
  ) {}

  async send(params: SendBilletRecharge.Params): SendBilletRecharge.Result {
    const destinations = [
      {
        correlationId: new Date().getTime(),
        destination: '5511971314531',
      },
    ];

    const base64 = await this.listCredentialByServiceAndMvno.findByService({
      mvnoId: params.data.mvnoId,
      service: 'WHATSAPP',
    });

    const credentials = this.transformCredentials(base64.credentials);

    if (params.status) {
      params.messages.splice(
        1,
        0,
        replaceKeyToValue(
          'Você também pode acessar o boleto através do link: {{link}}. Lembre-se a data de expiração é *{{expirationDate}}*',
          {
            link: params.data.billet.link,
            expirationDate: format(
              new Date(`${params.data.billet.expirationDate} 03:00`),
              'dd/MM/yyyy',
            ),
          },
        ),
      );
    }

    for await (const message of params.messages) {
      const body = {
        destinations: destinations,
        message: {
          messageText: replaceKeyToValue(message, params.data),
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
