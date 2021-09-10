import { AddUserCard } from '../../../../../data/protocols/core/http/add-user-card';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '../../../../../utils/object';

export class AddCardService implements AddUserCard {
  constructor(private readonly httpClient: HttpClient) {}

  async add(params: AddUserCard.Params): AddUserCard.Result {
    const body = formateCamelCaseKeysForSnakeCase({
      name: params.name,
      document: params.document,
      validity: params.validity,
      cardNumber: params.cardNumber,
      cvv: params.cvv,
      type: params.type,
    });

    const result = await this.httpClient.request({
      method: 'POST',
      url: 'v1/cards',
      body,
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
      payload: formateSnakeCaseKeysForCamelCase(result.body),
    };
  }
}
