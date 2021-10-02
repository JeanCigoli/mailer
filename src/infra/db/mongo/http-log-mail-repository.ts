import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '@badass-team-code/formatted-cases-words';
import {
  CreateLogSendMailRepository,
  UpdateLogSendMailRepository,
} from '../../../data/protocols/db/mongo';
import { MongoHelper } from './helpers';

export class HttpLogMailRepository
  implements CreateLogSendMailRepository, UpdateLogSendMailRepository
{
  async update(params: any, id: number): UpdateLogSendMailRepository.Result {
    const mailCollection = await MongoHelper.getCollection('http-log-mail');

    const data = await mailCollection.updateOne(
      {
        id: id,
      },
      {
        $set: formateCamelCaseKeysForSnakeCase(params),
      },
    );

    return data.result;
  }

  async create(params: any): CreateLogSendMailRepository.Result {
    const mailCollection = await MongoHelper.getCollection('http-log-mail');

    const data = await mailCollection.insertOne(
      formateCamelCaseKeysForSnakeCase(params),
    );

    return formateSnakeCaseKeysForCamelCase(data);
  }
}
