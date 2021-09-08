import { MongoClient, Collection } from 'mongodb';

type Credentials = {
  user: string;
  password: string;
  host: string;
  port: number;
  name: string;
  authSource: string;
};

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async setCredentials(credential: Credentials) {
    this.uri = `mongodb://${credential.user}:${credential.password}@${credential.host}:${credential.port}/${credential.name}?authSource=${credential.authSource}&authMechanism=SCRAM-SHA-1`;
  },

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null as unknown as MongoClient;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect();
    }

    return this.client.db().collection(name);
  },

  map: (data: any): any => {
    const { _id, ...rest } = data;
    return { ...rest, id: _id };
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map((c) => MongoHelper.map(c));
  },
};
