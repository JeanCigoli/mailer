import { GetToken } from '../../../../domain/usecases/core/token/get-token';
import { GetClientToken } from '../../../protocols/core/http/get-client-token';

export class HttpGetToken implements GetToken {
  constructor(private readonly getClientToken: GetClientToken) {}

  async handle(params: GetToken.Params): GetToken.Result {
    const result = await this.getClientToken.get(params);

    if (!result.status) throw new Error('ERROR_GET_TOKEN');

    return result;
  }
}
