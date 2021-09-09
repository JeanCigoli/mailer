import { GetUserCards } from '../../../../../data/protocols/core/http/get-user-cards';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';
import { formateSnakeCaseKeysForCamelCase } from '../../../../../utils/object';

export class GetCardsService implements GetUserCards {
  constructor(private readonly httpClient: HttpClient) {}

  async get(clientToken: string): GetUserCards.Result {
    const result = await this.httpClient.request({
      method: 'GET',
      url: 'v1/cards',
      headers: {
        Authorization: clientToken,
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
