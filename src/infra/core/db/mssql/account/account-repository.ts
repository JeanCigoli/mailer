import {
  ListAccountByMsisdnAndMvnoRepository,
  ListAccountByMsisdnRepository,
} from '../../../../../data/protocols/core/db';
import { formateSnakeCaseKeysForCamelCase } from '../../../../../utils/object';
import { dbPhoenix } from '../helpers';

export class AccountRepository
  implements
    ListAccountByMsisdnRepository,
    ListAccountByMsisdnAndMvnoRepository
{
  async findByMsisdnAndMvno(
    params: ListAccountByMsisdnAndMvnoRepository.Params,
  ): ListAccountByMsisdnAndMvnoRepository.Result {
    const result = await dbPhoenix('[client].[tb_account] as [account]')
      .innerJoin(
        '[client].[tb_client] as [client]',
        '[account].client_id',
        '[client].[client_id]',
      )
      .innerJoin(
        '[config].[tb_mvno] as [mvno]',
        '[account].mvno_id',
        '[mvno].mvno_id',
      )
      .select(
        '[account].account_id',
        '[account].external_id',
        '[account].msisdn',
        '[account].[dt_grace] as date_grace',
        '[client].[name]',
        '[client].email',
        '[mvno].[name] as mvno',
        '[mvno].[mvno_id]',
      )
      .whereNull('[account].deleted_at')
      .andWhere('[mvno].[mvno_id]', params.mvnoId)
      .andWhere('[account].msisdn', params.msisdn)
      .first();

    return formateSnakeCaseKeysForCamelCase(result);
  }

  async findByMsisdn(
    params: ListAccountByMsisdnRepository.Params,
  ): ListAccountByMsisdnRepository.Result {
    const result = await dbPhoenix('[client].[tb_account] as [account]')
      .innerJoin(
        '[client].[tb_client] as [client]',
        '[account].client_id',
        '[client].[client_id]',
      )
      .innerJoin(
        '[config].[tb_mvno] as [mvno]',
        '[account].mvno_id',
        '[mvno].mvno_id',
      )
      .select(
        '[account].account_id',
        '[account].external_id',
        '[account].msisdn',
        '[account].[dt_grace] as date_grace',
        '[client].[name]',
        '[client].document',
        '[client].email',
        '[mvno].[name] as mvno',
        '[mvno].[mvno_id]',
      )
      .whereNull('[account].deleted_at')
      .andWhere('[account].msisdn', params.msisdn)
      .first();

    return formateSnakeCaseKeysForCamelCase(result);
  }
}
