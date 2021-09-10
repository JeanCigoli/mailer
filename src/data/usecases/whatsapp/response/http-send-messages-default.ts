import { ButtonWhats } from '../../../../domain/models';
import { SendMessagesDefault } from '../../../../domain/usecases/whatsapp';
import { replaceKeyToValue } from '../../../../utils/replace-key-to-value';
import { ListCredentialByServiceAndMvno } from '../../../protocols/core/db';
import { TransformCredentials } from '../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../protocols/whatsapp/http';

export class HttpSendMessagesDefault implements SendMessagesDefault {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
    private readonly arrayButtons: number[],
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

    if (!this.arrayButtons.length) {
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

    const [firstMessage, secondMessage] = params.messages;

    const firstFormat = replaceKeyToValue(firstMessage, params.data);
    const secondFormat = replaceKeyToValue(secondMessage, params.data);

    const body: ButtonWhats = {
      destinations: destinations,
      message: {
        interactive: {
          messageInteractiveType: 'REPLY_BUTTON',
          header: {
            text: !!secondMessage ? firstFormat : 'Selecione uma opção',
          },
          body: {
            text: !!secondMessage ? secondFormat : firstFormat,
          },
          replyButtonAction: {
            buttons: this.arrayButtons.map((value) => ({
              reply: {
                title: value,
                payload: value,
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
