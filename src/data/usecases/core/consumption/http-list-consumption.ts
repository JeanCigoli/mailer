import { format, subMonths } from 'date-fns';
import { ListConsumption } from '../../../../domain/usecases/core/consumption/list-consumption';
import { GetUserConsumption } from '../../../protocols/core/http/get-user-consumption';

export class HttpListConsumption implements ListConsumption {
  constructor(private readonly getUserConsumption: GetUserConsumption) {}

  async handle(params: ListConsumption.Params): ListConsumption.Result {
    const date = format(subMonths(new Date(), 30), 'yyyy-MM-dd');

    const result = await this.getUserConsumption.get({
      identifier: params.msisdn,
      token: params.token,
      dateInitials: date,
    });

    if (!result.status || !result.payload)
      throw new Error('ERROR_GET_CONSUMPTION');

    return { consumption: result.payload };
  }
}
