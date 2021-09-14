import {
  GetAccount,
  HttpClient,
} from '../../../../../data/protocols/core/http';
import { formateSnakeCaseKeysForCamelCase } from '../../../../../utils/object';

export class GetAccountService implements GetAccount {
  constructor(private readonly httpClient: HttpClient) {}

  async get(params: GetAccount.Params): GetAccount.Result {
    const result = await this.httpClient.request({
      method: 'GET',
      url: 'v1/accounts',
      headers: {
        authorization: params.clientToken,
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
