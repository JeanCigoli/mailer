import { ListAccountByMsisdnRepository } from '../../../../data/protocols/core/db';
import { formateSnakeCaseKeysForCamelCase } from '../../../../utils/object';
import { dbPhoenix } from '../helpers';

export class AccountRepository implements ListAccountByMsisdnRepository {
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
        '[client].[name]',
        '[client].email',
        '[mvno].[name] as mvno',
      )
      .whereNull('[account].deleted_at')
      .andWhere('[account].msisdn', params.msisdn)
      .first();

    return formateSnakeCaseKeysForCamelCase(result);
  }
}
