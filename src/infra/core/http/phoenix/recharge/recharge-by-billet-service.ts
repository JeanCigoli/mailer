import { RechargeByBillet } from '../../../../../data/protocols/core/http/recharge-by-billet';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';
import { formateCamelCaseKeysForSnakeCase } from '../../../../../utils/object';

export class RechargeByBilletService implements RechargeByBillet {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(params: RechargeByBillet.Params): RechargeByBillet.Result {
    const body = formateCamelCaseKeysForSnakeCase({
      planId: params.planId,
      msisdn: params.msisdn,
    });

    const result = await this.httpClient.request({
      method: 'POST',
      url: 'v1/recharges/billets',
      body,
      headers: {
        authorization: params.clientToken,
      },
    });

    if (result.statusCode > 299) {
      return {
        status: false,
        payload: formateCamelCaseKeysForSnakeCase(result.body),
      };
    }

    return {
      status: true,
      payload: formateCamelCaseKeysForSnakeCase(result.body.payload),
    };
  }
}
