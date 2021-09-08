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
      url: '/recharges/billets',
      body,
      headers: {
        Authorizarion: params.clientToken,
      },
    });

    if (result.statusCode > 299) {
      return {
        status: false,
      };
    }

    return {
      status: true,
      payload: formateCamelCaseKeysForSnakeCase(result.body.payload),
    };
  }
}
