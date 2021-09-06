import { ListAddonValues } from '../../../../domain/usecases/core/plan-values/list-addon-values';
import { GetPlanValues } from '../../../protocols/core/http/get-plan-values';

export class HttpListAddonValues implements ListAddonValues {
  constructor(private readonly getPlanValues: GetPlanValues) {}

  async handle(clientToken: string): ListAddonValues.Result {
    const result = await this.getPlanValues.getAllValues(clientToken);

    if (!result.status || !result.payload) throw new Error('REQUEST_ERROR');

    const addonValues = result.payload.filter((value) => {
      if (value.type.replace(' ', '_').toUpperCase() === 'PACOTE_ADICIONAL')
        return value;
    });

    return { addonValues };
  }
}
