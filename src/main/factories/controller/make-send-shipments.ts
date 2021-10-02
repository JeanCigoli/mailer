import { RaqSendShipments } from '../../../data/usecases/shipments/raq-send-shipments';
import { RabbitMqServer } from '../../../infra/amqp/helper';
import { transformCredentials } from '../../../infra/cryptography/base64';
import {
  ServiceCredentialRepository,
  ServiceRepository,
} from '../../../infra/db/mssql';
import { SendShipmentsController } from '../../../presentation/controllers';

export const makeSendShipments = () => {
  const serviceRepository = new ServiceRepository();
  const serviceCredentialRepository = new ServiceCredentialRepository();

  const rabbitMq = RabbitMqServer.getInstance();

  const raqSendShipments = new RaqSendShipments(
    serviceRepository,
    serviceCredentialRepository,
    transformCredentials,
    rabbitMq,
  );

  return new SendShipmentsController(raqSendShipments);
};
