import { DbAuthentication } from '../../../../../data/usecases/core';
import { CustomerAuthCodeRepository } from '../../../../../infra/core/db/mongo';
import {
  AccountRepository,
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { AuthenticationMiddleware } from '../../../../../presentation/middlewares';

export const makeAuthenticationUra = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueUraRepository = new DialogueUraRepository();
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueUraRepository,
    customerAuthCodeRepository,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};

export const makeAuthenticationSms = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueSmsRepository = new DialogueSmsRepository();
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueSmsRepository,
    customerAuthCodeRepository,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};

export const makeAuthenticationWhats = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueWhatsAppRepository,
    customerAuthCodeRepository,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};
