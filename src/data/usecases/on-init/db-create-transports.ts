import { CreateTransports } from '../../../domain/usecases';
import { MailerServer } from '../../../infra/mailer/helpers';
import { SERVICE } from '../../../utils/enum';
import { Base64Decode } from '../../protocols/cryptography';
import {
  ListAllCredentialsRepository,
  ListServiceByNameRepository,
} from '../../protocols/db/mssql';

export class DbCreateTransports implements CreateTransports {
  constructor(
    private readonly listServiceByNameRepository: ListServiceByNameRepository,
    private readonly listAllCredentialsRepository: ListAllCredentialsRepository,
    private readonly base64Decode: Base64Decode,
    private readonly mailerServer: MailerServer,
  ) {}

  async start(): CreateTransports.Result {
    const service = await this.listServiceByNameRepository.findName(
      SERVICE.MAILER,
    );

    const credentials = await this.listAllCredentialsRepository.findAll({
      serviceId: service.serviceId,
    });

    credentials.map((value) => {
      const credential = this.base64Decode(value.credentials);

      this.mailerServer.setTransports(
        {
          alias: credential.alias,
          host: credential.credential.host,
          password: credential.credential.password,
          user: credential.credential.user,
          port: credential.credential.port,
        },
        credential.type as any,
      );
    });
  }
}
