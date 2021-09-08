import { ListPlanValues } from '../../../../domain/usecases/core/plan-values/list-plan-values';
import { GetPlanValues } from '../../../protocols/core/http/get-plan-values';

export class HttpListPlanValues implements ListPlanValues {
  constructor(private readonly getPlanValues: GetPlanValues) {}

  async handle(params: ListPlanValues.Params): ListPlanValues.Result {
    const allValues = await this.getPlanValues.getAllValues(params.clientToken);

    if (!allValues.status || !allValues.payload) {
      throw new Error('REQUEST_ERROR');
    }

    const planValues = allValues.payload.filter((value) => {
      if (value.type.toUpperCase() === params.type) {
        return value;
      }
    });

    return { planValues };
  }
}
