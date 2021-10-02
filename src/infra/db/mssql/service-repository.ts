import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';
import { ListServiceByNameRepository } from '../../../data/protocols/db/mssql';
import { knexConnection } from './helpers';

export class ServiceRepository implements ListServiceByNameRepository {
  async findName(name: string): ListServiceByNameRepository.Result {
    const service = await knexConnection('[Phoenix].[config].[tb_service]')
      .select('*')
      .where('[name]', name)
      .first();

    return formateSnakeCaseKeysForCamelCase(service);
  }
}
