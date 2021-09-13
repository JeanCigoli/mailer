import { Card } from '../../../../domain/models';
import { ListCardsSms } from '../../../../domain/usecases/sms/list-cards/list-cards-sms';
import { SendSms } from '../../../protocols/core/http/send-sms';

export class HttpListCardsSms implements ListCardsSms {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): ListCardsSms.Result {
    const cards: Array<Card> = body.data.cards;

    const messages = cards.map(
      async (card) => `${card.flag} - ${card.lastDigits} \n `,
    );

    const reducedMessages = messages.reduce(async (acumulator, current) => {
      const acumulatorValue = await acumulator;
      const currentValue = await current;

      const text = acumulatorValue + currentValue;

      if (text.length >= 160) {
        await this.sendSms.send({
          message: acumulatorValue,
          msisdn: body.data.msisdn,
          clientToken: body.data.token,
        }),
          (acumulator = current);

        return acumulator;
      }

      acumulator = Promise.resolve(text);

      return acumulator;
    });

    const finalMessage = await reducedMessages;

    await this.sendSms.send({
      message: finalMessage,
      msisdn: body.data.msisdn,
      clientToken: body.data.token,
    });
  }
}
