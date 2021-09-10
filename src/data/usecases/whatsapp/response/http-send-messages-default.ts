import { ButtonWhats } from '../../../../domain/models';
import { SendMessagesDefault } from '../../../../domain/usecases/whatsapp';
import { replaceKeyToValue } from '../../../../utils/replace-key-to-value';
import { SendMessageWhatsApp } from '../../../protocols/whatsapp/http';

export class HttpSendMessagesDefault implements SendMessagesDefault {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly arrayButtons: number[],
  ) {}

  async send(params: SendMessagesDefault.Params): SendMessagesDefault.Result {
    const destinations = [
      {
        correlationId: new Date().getTime(),
        destination: '5511996059255',
      },
    ];

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
          credentials: {
            token: 'XlSA_NExmghDrxgkfVojrx3BM6GccGPf5XhoDUDg',
            username: 'arqia@pagtel.com.br',
          },
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
      credentials: {
        token: 'XlSA_NExmghDrxgkfVojrx3BM6GccGPf5XhoDUDg',
        username: 'arqia@pagtel.com.br',
      },
    });

    return;
  }
}
