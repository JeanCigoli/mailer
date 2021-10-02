import { DbCreateTransports } from '../../../data/usecases/on-init/db-create-transports';
import { transformCredentials } from '../../../infra/cryptography/base64';
import {
  ServiceCredentialRepository,
  ServiceRepository,
} from '../../../infra/db/mssql';
import { MailerServer } from '../../../infra/mailer/helpers';

export const makeCreateTransportOnInit = () => {
  const serviceCredentialRepository = new ServiceCredentialRepository();
  const serviceRepository = new ServiceRepository();

  const mailer = MailerServer.getInstance();

  return new DbCreateTransports(
    serviceRepository,
    serviceCredentialRepository,
    transformCredentials,
    mailer,
  );
};
