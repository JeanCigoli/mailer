import { HttpClient } from '../../../../../data/protocols/core/http';
import { GetClientToken } from '../../../../../data/protocols/core/http/get-client-token';

export class GetClientTokenService implements GetClientToken {
  constructor(private readonly httpClient: HttpClient) {}

  async get(params: GetClientToken.Params): GetClientToken.Result {
    const result = await this.httpClient.request({
      method: 'POST',
      url: `v1/auth/internal/msisdn/${params.msisdn}`,
      headers: {
        Authentication: params.authentication,
      },
    });

    if (result.statusCode > 299) return { status: false };

    return {
      status: true,
      token: result.body.payload.token,
    };
  }
}
