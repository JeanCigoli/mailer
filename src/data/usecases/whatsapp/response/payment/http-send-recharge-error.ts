import { ButtonWhats } from '../../../../../domain/models';
import { SendRechargeError } from '../../../../../domain/usecases/whatsapp';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { ListCredentialByServiceAndMvno } from '../../../../protocols/core/db';
import { TransformCredentials } from '../../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../../protocols/whatsapp/http';
import { VerifyMessages } from '../../../../protocols/whatsapp/utils';

export class HttpSendRechargeError implements SendRechargeError {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
    private readonly verifyMessages: VerifyMessages,
  ) {}

  async send(params: SendRechargeError.Params): SendRechargeError.Result {
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

    const [firstMessage] = params.messages;

    const verify = this.verifyMessages('Operação não realizada', firstMessage);

    const variables = {
      reason: params.data.message,
    };

    const headerMessage = replaceKeyToValue(verify.headerMessage, variables);
    const bodyMessage = replaceKeyToValue(verify.bodyMessage, variables);

    const body: ButtonWhats = {
      destinations: destinations,
      message: {
        interactive: {
          messageInteractiveType: 'REPLY_BUTTON',
          header: {
            text: headerMessage,
          },
          body: {
            text: bodyMessage,
          },
          replyButtonAction: {
            buttons: verify.buttons.map(([key, value]) => ({
              reply: {
                title: value,
                payload: key,
              },
            })),
          },
          alternativeText: params.messages
            .map((message) => replaceKeyToValue(message, params.data))
            .join('\n'),
        },
      },
    };

    await this.sendMessageWhatsApp.send({
      body,
      credentials,
    });

    return;
  }
}
