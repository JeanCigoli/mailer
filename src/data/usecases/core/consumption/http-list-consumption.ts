import { ListConsumption } from '../../../../domain/usecases/core/consumption/list-consumption';
import { GetUserConsumption } from '../../../protocols/core/http/get-user-consumption';

export class HttpListConsumption implements ListConsumption {
  constructor(private readonly getUserConsumption: GetUserConsumption) {}

  async handle(clientToken: string): ListConsumption.Result {
    const result = await this.getUserConsumption.get(clientToken);

    if (!result.status || !result.payload)
      throw new Error('ERROR_GET_CONSUMPTION');

    return { consumption: result.payload };
  }
}
