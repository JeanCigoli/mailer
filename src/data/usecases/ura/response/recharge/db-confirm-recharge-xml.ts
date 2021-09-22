import { ConfirmRechargeXml } from '../../../../../domain/usecases/ura';
import { formatNumberToUra } from '../../../../../utils/formatter/format-numbers-ura';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbConfirmRechargeXml implements ConfirmRechargeXml {
  format(params: any): ConfirmRechargeXml.Result {
    const [first, second] = params.messages;

    const plan = params.data.values;

    if (second) {
      const [confirm, execute, final, digit, menu] = JSON.parse(second);

      if (params.data.newCard) {
        const cardLength = params.data.newCard.cardNumber.length;

        const lastDigits = params.data.newCard.cardNumber.substr(
          cardLength - 4,
          cardLength - 1,
        );

        const digits = formatNumberToUra(lastDigits);
        return makeResponseXml({
          status: 'P00',
          messages: [
            first,
            confirm,
            plan.audio,
            execute,
            final,
            ...digits.data.split(';'),
            digit,
            menu,
          ],
        });
      }

      const digits = formatNumberToUra(params.data.cards.lastDigits);
      return makeResponseXml({
        status: 'P00',
        messages: [
          first,
          confirm,
          plan.audio,
          execute,
          final,
          ...digits.data.split(';'),
          digit,
          menu,
        ],
      });
    }

    const [confirm, execute, final, digit, menu] = JSON.parse(first);

    if (params.data.newCard) {
      const cardLength = params.data.newCard.cardNumber.length;

      const lastDigits = params.data.newCard.cardNumber.substr(
        cardLength - 4,
        cardLength - 1,
      );

      const digits = formatNumberToUra(lastDigits);
      return makeResponseXml({
        status: 'P00',
        messages: [
          confirm,
          plan.audio,
          execute,
          final,
          ...digits.data.split(';'),
          digit,
          menu,
        ],
      });
    }

    const digits = formatNumberToUra(params.data.cards.lastDigits);
    return makeResponseXml({
      status: 'P00',
      messages: [
        confirm,
        plan.audio,
        execute,
        final,
        ...digits.data.split(';'),
        digit,
        menu,
      ],
    });
  }
}
