import {
  ListCredentialByServiceAndMvno,
  ListSourceMvnoRepository,
} from '../../../../../data/protocols/core/db';
import { formateSnakeCaseKeysForCamelCase } from '../../../../../utils/object';
import { dbPhoenix } from '../helpers';

export class SourceMvnoRepository
  implements ListSourceMvnoRepository, ListCredentialByServiceAndMvno
{
  async findByService(
    params: ListCredentialByServiceAndMvno.Params,
  ): ListCredentialByServiceAndMvno.Result {
    const result = await dbPhoenix(
      '[config].[tb_service_mvno_credentials] as [credentials]',
    )
      .innerJoin(
        '[config].[tb_service] as [service]',
        '[credentials].service_id',
        '[service].service_id',
      )
      .where('[service].[name]', params.service)
      .andWhere('[credentials].mvno_id', params.mvnoId)
      .first();

    return formateSnakeCaseKeysForCamelCase(result);
  }

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
