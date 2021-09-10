import { format } from 'date-fns';
import { SendConsumption } from '../../../../domain/usecases/whatsapp';
import { replaceKeyToValue } from '../../../../utils/replace-key-to-value';
import { ListCredentialByServiceAndMvno } from '../../../protocols/core/db';
import { TransformCredentials } from '../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../protocols/whatsapp/http';

export class HttpSendConsumption implements SendConsumption {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
  ) {}

  async send(params: SendConsumption.Params): SendConsumption.Result {
    const variablesMessages = {
      internet: params.data.consumption.data.available,
      minutes: params.data.consumption.voice.available,
      sms: params.data.consumption.sms.available,
      mvno: params.data.mvno,
      validity: format(new Date(params.data.dateGrace), 'dd/MM/yyyy'),
    };

    const destinations = [
      {
        correlationId: new Date().getTime(),
        destination: '5511996059255',
      },
    ];

    const base64 = await this.listCredentialByServiceAndMvno.findByService({
      mvnoId: params.data.mvnoId,
      service: 'WHATSAPP',
    });

    const credentials = this.transformCredentials(base64.credentials);

    for await (const message of params.messages) {
      const body = {
        destinations: destinations,
        message: {
          messageText: replaceKeyToValue(message, variablesMessages),
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
