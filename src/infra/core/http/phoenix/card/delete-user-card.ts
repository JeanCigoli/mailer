import {
  DeleteCard,
  HttpClient,
} from '../../../../../data/protocols/core/http';

export class DeleteUserCard implements DeleteCard {
  constructor(private readonly httpClient: HttpClient) {}

  async delete(paymentId: string): DeleteCard.Result {
    const result = await this.httpClient.request({
      method: 'DELETE',
      url: `/cards/${paymentId}`,
    });

    return result.body;
  }
}
