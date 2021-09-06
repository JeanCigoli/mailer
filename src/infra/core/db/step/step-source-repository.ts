import {
  listStepSourceByIdRepository,
  ListStepSourceByStepRepository,
} from '../../../../data/protocols/core/db';
import { formateSnakeCaseKeysForCamelCase } from '../../../../utils/object';
import { dbPhoenix } from '../helpers';

export class StepSourceRepository
  implements ListStepSourceByStepRepository, listStepSourceByIdRepository
{
  async findByStep(
    params: ListStepSourceByStepRepository.Params,
  ): ListStepSourceByStepRepository.Result {
    const result = await dbPhoenix('[config].[tb_step_source]')
      .select('*')
      .where('[source_id]', params.sourceId)
      .andWhere('[step_id]', params.stepId)
      .first();

    return formateSnakeCaseKeysForCamelCase(result);
  }

  async findById(
    params: listStepSourceByIdRepository.Params,
  ): listStepSourceByIdRepository.Result {
    const result = await dbPhoenix('[config].[tb_step_source]')
      .select('*')
      .where('[step_source_id]', params.id)
      .first();

    return formateSnakeCaseKeysForCamelCase(result);
  }
}
