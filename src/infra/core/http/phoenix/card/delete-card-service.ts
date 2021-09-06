import { DeleteUserCard } from '../../../../../data/protocols/core/http/delete-user-card';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';
import { formateSnakeCaseKeysForCamelCase } from '../../../../../utils/object';

export class DeleteCardService implements DeleteUserCard {
  constructor(private readonly httpClient: HttpClient) {}

  async delete(params: DeleteUserCard.Params): DeleteUserCard.Result {
    const result = await this.httpClient.request({
      method: 'DELETE',
      url: `/cards/${params.paymentId}`,
      headers: {
        Authentication: params.clientToken,
      },
    });

    if (result.statusCode > 299) {
      return {
        status: false,
      };
    }

    return { status: true };
  }
}
