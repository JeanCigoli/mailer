import { DbCreateMongo } from '../../../data/usecases';
import { MongoHelper } from '../../../infra/db/mongo/helpers';

export const makeCreateMongoOnInit = () => {
  return new DbCreateMongo(MongoHelper);
};
