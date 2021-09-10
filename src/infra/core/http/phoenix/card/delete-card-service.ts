import { DeleteUserCard } from '../../../../../data/protocols/core/http/delete-user-card';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';

export class DeleteCardService implements DeleteUserCard {
  constructor(private readonly httpClient: HttpClient) {}

  async delete(params: DeleteUserCard.Params): DeleteUserCard.Result {
    const result = await this.httpClient.request({
      method: 'DELETE',
      url: `v1/cards/${params.paymentId}`,
      headers: {
        authorization: params.clientToken,
      },
    });

    if (result.statusCode > 299) {
      return {
        status: false,
        message: result.body.message,
      };
    }

    return { status: true, message: result.body.message };
  }
}
