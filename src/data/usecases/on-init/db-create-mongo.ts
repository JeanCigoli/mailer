import { CreateMongo } from '../../../domain/usecases';
import { MongoHelper } from '../../../infra/db/mongo/helpers';
import { MONGO } from '../../../utils/config/constants';

export class DbCreateMongo implements CreateMongo {
  constructor(private readonly mongo: typeof MongoHelper) {}

  async start(): CreateMongo.Result {
    await this.mongo.setCredentials({
      authSource: MONGO.AUTH_SOURCE,
      host: MONGO.HOST,
      name: MONGO.NAME,
      password: MONGO.PASSWORD,
      port: +MONGO.PORT,
      user: MONGO.USER,
    });

    await this.mongo.connect();
  }
}
