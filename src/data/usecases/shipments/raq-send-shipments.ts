import { SendShipments } from '../../../domain/usecases';
import { RabbitMqServer } from '../../../infra/amqp/helper';
import { SERVICE } from '../../../utils/enum';
import { Base64Decode } from '../../protocols/cryptography';
import {
  ListCredentialByServiceAndMvnoRepository,
  ListServiceByNameRepository,
} from '../../protocols/db/mssql';

export class RaqSendShipments implements SendShipments {
  constructor(
    private readonly listServiceByNameRepository: ListServiceByNameRepository,
    private readonly listCredentialByServiceAndMvnoRepository: ListCredentialByServiceAndMvnoRepository,
    private readonly base64Decode: Base64Decode,
    private readonly rabbitMqServer: RabbitMqServer,
  ) {}

  async send(params: SendShipments.Params): SendShipments.Result {
    const service = await this.listServiceByNameRepository.findName(
      SERVICE.MAILER,
    );

    const serviceCredential =
      await this.listCredentialByServiceAndMvnoRepository.findByServiceAndMvno({
        mvnoId: params.mvnoId,
        serviceId: service.serviceId,
      });

    const credential = this.base64Decode(serviceCredential.credentials);

    params.mail.to.map((mail) => {
      this.rabbitMqServer.publishInQueue(
        'mailer',
        {
          alias: credential.alias,
          from: credential.from,
          mvnoId: params.mvnoId,
          to: mail.email,
          subject: params.mail.subject,
          template: params.mail.template,
          context: mail.variables,
        },
        { authorization: params.token },
      );
    });

    return {
      message: 'Todos os templates foram adicionados na fila de envio!',
    };
  }
}
