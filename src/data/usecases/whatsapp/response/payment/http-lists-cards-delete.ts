import { Card, ListWhats } from '../../../../../domain/models';
import { SendListsCardsDelete } from '../../../../../domain/usecases/whatsapp';
import { ListCredentialByServiceAndMvno } from '../../../../protocols/core/db';
import { TransformCredentials } from '../../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../../protocols/whatsapp/http';

export class HttpListsCardsDelete implements SendListsCardsDelete {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
  ) {}

  async list(params: SendListsCardsDelete.Params): SendListsCardsDelete.Result {
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

    const [firstMessage, secondMessage] = params.messages;
    const values = params.data.cards
      .map(
        (value: Card, index: number) =>
          `${index + 1}: ${value.flag} - ${value.lastDigits}`,
      )
      .join('\n');

    const body: ListWhats = {
      destinations: destinations,
      message: {
        interactive: {
          messageInteractiveType: 'LIST',
          header: {
            text: secondMessage ? firstMessage : 'Visualização dos cartões',
          },
          body: {
            text: secondMessage ? secondMessage : firstMessage,
          },
          listAction: {
            button: 'Cartões',
            sections: [
              {
                rows: [
                  ...params.data.cards.map((value: Card, index: number) => ({
                    identifier: index + 1,
                    title: `${value.binCode} ** ${value.lastDigits}`,
                    description: `${value.flag}`,
                  })),
                  {
                    identifier: 0,
                    description: '',
                    title: 'Voltar ao menu',
                  },
                ],
              },
            ],
          },
          alternativeText: firstMessage.concat('\n\n', values),
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