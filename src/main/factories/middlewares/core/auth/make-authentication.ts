import { DbAuthentication } from '../../../../../data/usecases/core';
import {
  AccountRepository,
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db';
import { AuthenticationMiddleware } from '../../../../../presentation/middlewares';

export const makeAuthenticationUra = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueUraRepository = new DialogueUraRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueUraRepository,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};

export const makeAuthenticationSms = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueSmsRepository = new DialogueSmsRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueSmsRepository,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};

export const makeAuthenticationWhats = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueWhatsAppRepository,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};
