import { ListSourceMvnoRepository } from '../../../../../data/protocols/core/db';
import { formateSnakeCaseKeysForCamelCase } from '../../../../../utils/object';
import { dbPhoenix } from '../helpers';

export class SourceMvnoRepository implements ListSourceMvnoRepository {
  async findBySource(
    params: ListSourceMvnoRepository.Params,
  ): ListSourceMvnoRepository.Result {
    const result = await dbPhoenix('[config].[tb_source_mvno]')
      .select('*')
      .where('[mvno_id]', params.mvnoId)
      .andWhere('[source_id]', params.sourceId)
      .whereNull('[deleted_at]')
      .first();

    return formateSnakeCaseKeysForCamelCase(result);
  }
}
