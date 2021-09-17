import { ButtonWhats } from '../../../../../domain/models';
import { SendConfirmAddCard } from '../../../../../domain/usecases/whatsapp';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { ListCredentialByServiceAndMvno } from '../../../../protocols/core/db';
import { TransformCredentials } from '../../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../../protocols/whatsapp/http';
import { VerifyMessages } from '../../../../protocols/whatsapp/utils';

export class HttpSendConfirmAddCard implements SendConfirmAddCard {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
    private readonly verifyMessages: VerifyMessages,
  ) {}

  async send(params: SendConfirmAddCard.Params): SendConfirmAddCard.Result {
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

    const verify = this.verifyMessages(
      'Confirmação de cadastro!',
      firstMessage,
    );

    const cardLength = params.data.newCard.cardNumber.length;

    const paramsVariables = {
      lastDigits: params.data.newCard.cardNumber.substr(
        cardLength - 4,
        cardLength - 1,
      ),
    };

    const headerMessage = replaceKeyToValue(
      verify.headerMessage,
      paramsVariables,
    );
    const bodyMessage = replaceKeyToValue(verify.bodyMessage, paramsVariables);

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
            .map((message) => {
              const [first] = message.split('|||');

              return replaceKeyToValue(first, params.data);
            })
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
