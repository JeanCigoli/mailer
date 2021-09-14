import { ButtonWhats } from '../../../../../domain/models';
import { SendConfirmRecharge } from '../../../../../domain/usecases/whatsapp';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { ListCredentialByServiceAndMvno } from '../../../../protocols/core/db';
import { TransformCredentials } from '../../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../../protocols/whatsapp/http';
import { VerifyMessages } from '../../../../protocols/whatsapp/utils';

export class HttpSendConfirmRecharge implements SendConfirmRecharge {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
    private readonly verifyMessages: VerifyMessages,
  ) {}

  async send(params: SendConfirmRecharge.Params): SendConfirmRecharge.Result {
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

    const [firstMessage] = params.messages;

    const verify = this.verifyMessages('Confirmação de recarga!', firstMessage);

    if (params.data.newCard) {
      const cardLength = params.data.newCard.cardNumber.length;

      params.data.lastDigits = params.data.newCard.cardNumber.substr(
        cardLength - 4,
        cardLength - 1,
      );
    }

    const headerMessage = replaceKeyToValue(verify.headerMessage, params.data);
    const bodyMessage = replaceKeyToValue(verify.bodyMessage, params.data);

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
