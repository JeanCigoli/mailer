import { ListAccountByMsisdnRepository } from '../../../../data/protocols/core/db';
import { dbPhoenix } from '../helpers';

export class AccountRepository implements ListAccountByMsisdnRepository {
  findByMsisdn(
    params: ListAccountByMsisdnRepository.Params,
  ): ListAccountByMsisdnRepository.Result {
    return dbPhoenix('[client].[tb_account] as [account]')
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
      .whereNull('deleted_at')
      .andWhere('msisdn', params.msisdn)
      .first();
  }
}
