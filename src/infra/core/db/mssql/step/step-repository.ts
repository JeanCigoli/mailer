import { ListStepWithSourceRepository } from '../../../../../data/protocols/core/db';
import { formateSnakeCaseKeysForCamelCase } from '../../../../../utils/object';
import { dbPhoenix } from '../helpers';

export class StepRepository implements ListStepWithSourceRepository {
  async findStepAndSource(
    params: ListStepWithSourceRepository.Params,
  ): ListStepWithSourceRepository.Result {
    const result = await dbPhoenix('[config].[tb_step_source]')
      .select('*')
      .where('step_id', params.step)
      .andWhere('source_id', params.sourceId)
      .first();

    return formateSnakeCaseKeysForCamelCase(result);
  }
}
