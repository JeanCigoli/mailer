import { ButtonWhats } from '../../../../../domain/models';
import { SendMessagesDefault } from '../../../../../domain/usecases/whatsapp';
import { makeMsisdnMask } from '../../../../../utils/mask';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { ListCredentialByServiceAndMvno } from '../../../../protocols/core/db';
import { TransformCredentials } from '../../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../../protocols/whatsapp/http';
import { VerifyMessages } from '../../../../protocols/whatsapp/utils';

export class HttpSendMessagesDefault implements SendMessagesDefault {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
    private readonly verifyMessages: VerifyMessages,
  ) {}

  async send(params: SendMessagesDefault.Params): SendMessagesDefault.Result {
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
    params.data.msisdn = makeMsisdnMask(params.data.msisdn, '(##) #####-####');

    const [firstMessage, secondMessage] = params.messages;

    const verify = this.verifyMessages(firstMessage, secondMessage);

    if (!verify.buttons.length) {
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
