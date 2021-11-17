import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';
import { ListDefaultParamsRepository } from '../../../data/protocols/db/mssql';
import { knexConnection } from './helpers';

export class ConfigRepository implements ListDefaultParamsRepository {
  async findDefaultParams(
    params: ListDefaultParamsRepository.Params,
  ): ListDefaultParamsRepository.Result {
    const mvno = await knexConnection('[Phoenix].[config].[tb_config]')
      .select('*')
      .where('[mvno_id]', params.mvnoId)
      .first();

    return formateSnakeCaseKeysForCamelCase(mvno);
  }
}
