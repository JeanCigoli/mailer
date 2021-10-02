import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';
import { credentials } from 'amqplib';
import {
  ListAllCredentialsRepository,
  ListCredentialByServiceAndMvnoRepository,
} from '../../../data/protocols/db/mssql';
import { knexConnection } from './helpers';

export class ServiceCredentialRepository
  implements
    ListCredentialByServiceAndMvnoRepository,
    ListAllCredentialsRepository
{
  async findAll(
    params: ListAllCredentialsRepository.Params,
  ): ListAllCredentialsRepository.Result {
    const credentials = await knexConnection(
      '[Phoenix].[config].[tb_service_mvno_credentials]',
    )
      .select('*')
      .whereNull('[deleted_at]')
      .andWhere('[service_id]', params.serviceId);

    return formateSnakeCaseKeysForCamelCase(credentials);
  }

  async findByServiceAndMvno(
    params: ListCredentialByServiceAndMvnoRepository.Params,
  ): ListCredentialByServiceAndMvnoRepository.Result {
    const credentials = await knexConnection(
      '[Phoenix].[config].[tb_service_mvno_credentials]',
    )
      .select('*')
      .whereNull('[deleted_at]')
      .andWhere('[service_id]', params.serviceId)
      .andWhere('[mvno_id]', params.mvnoId)
      .first();

    return formateSnakeCaseKeysForCamelCase(credentials);
  }
}
