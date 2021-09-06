import { GetCards, HttpClient } from '../../../../../data/protocols/core/http';

export class GetUserCards implements GetCards {
  constructor(private readonly httpClient: HttpClient) {}

  async get(accountId: string): GetCards.Result {
    const result = await this.httpClient.request({
      method: 'GET',
      url: `/cards/${accountId}`,
    });

    return result.body;
  }
}
