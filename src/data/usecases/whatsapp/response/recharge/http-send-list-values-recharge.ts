import { ListWhats, Plan } from '../../../../../domain/models';
import { SendListValuesRecharge } from '../../../../../domain/usecases/whatsapp';
import { ListCredentialByServiceAndMvno } from '../../../../protocols/core/db';
import { TransformCredentials } from '../../../../protocols/core/utils';
import { SendMessageWhatsApp } from '../../../../protocols/whatsapp/http';

export class HttpSendListValuesRecharge implements SendListValuesRecharge {
  constructor(
    private readonly sendMessageWhatsApp: SendMessageWhatsApp,
    private readonly listCredentialByServiceAndMvno: ListCredentialByServiceAndMvno,
    private readonly transformCredentials: TransformCredentials,
  ) {}

  async send(
    params: SendListValuesRecharge.Params,
  ): SendListValuesRecharge.Result {
    const destinations = [
      {
        correlationId: new Date().getTime(),
        destination: params.msisdn,
      },
    ];

    const base64 = await this.listCredentialByServiceAndMvno.findByService({
      mvnoId: params.data.mvnoId,
      service: 'WHATSAPP',
    });

    const credentials = this.transformCredentials(base64.credentials);

    const [firstMessage] = params.messages;

    const values = params.data.values
      .map(
        (value: Plan, index: number) =>
          `${index + 1}: ${value.label} - ${value.name}`,
      )
      .join('\n');

    const body: ListWhats = {
      destinations: destinations,
      message: {
        interactive: {
          messageInteractiveType: 'LIST',
          header: {
            text: 'Visualização dos planos',
          },
          body: {
            text: firstMessage,
          },
          listAction: {
            button:
              params.data.type === 'RECHARGE_PLAN'
                ? 'Plano Avulso'
                : 'Plano Adicional',
            sections: [
              {
                rows: [
                  ...params.data.values.map((value: Plan, index: number) => ({
                    identifier: index + 1,
                    title: `${value.label} - ${value.name}`,
                    description: value.description,
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
