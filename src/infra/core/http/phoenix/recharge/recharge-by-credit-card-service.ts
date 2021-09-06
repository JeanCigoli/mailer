import { RechargeByCreditCard } from '../../../../../data/protocols/core/http/recharge-by-credit-card';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '../../../../../utils/object';

export class RechargeByCreditCardService implements RechargeByCreditCard {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(
    params: RechargeByCreditCard.Params,
  ): RechargeByCreditCard.Result {
    const body = formateCamelCaseKeysForSnakeCase({
      planId: params.planId,
      msisdn: params.msisdn,
      cvv: params.cvv,
    });

    const result = await this.httpClient.request({
      method: 'POST',
      url: `/recharges/cards/${params.paymentId}`,
      body,
      headers: {
        Authentication: params.clientToken,
      },
    });

    if (result.statusCode > 299) {
      return {
        status: false,
      };
    }

    return {
      status: true,
      payload: formateSnakeCaseKeysForCamelCase(result.body.payload),
    };
  }
}
