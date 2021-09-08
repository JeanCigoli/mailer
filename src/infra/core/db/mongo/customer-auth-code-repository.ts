import { ListAuthCodeRepository } from '../../../../data/protocols/core/db';
import { formateSnakeCaseKeysForCamelCase } from '../../../../utils/object';
import { MongoHelper } from './helpers';

export class CustomerAuthCodeRepository implements ListAuthCodeRepository {
  async findByAccount(
    params: ListAuthCodeRepository.Params,
  ): ListAuthCodeRepository.Result {
    const customerCollection = await MongoHelper.getCollection(
      'costumer_auth_code',
    );

    const data = await customerCollection.findOne({
      account_id: params.accountId,
      deleted_at: null,
    });

    return formateSnakeCaseKeysForCamelCase(data);
  }
}
