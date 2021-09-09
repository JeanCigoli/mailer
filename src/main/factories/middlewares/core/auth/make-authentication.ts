import { DbAuthentication } from '../../../../../data/usecases/core';
import { CustomerAuthCodeRepository } from '../../../../../infra/core/db/mongo';
import {
  AccountRepository,
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  SourceMvnoRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { AuthenticationMiddleware } from '../../../../../presentation/middlewares';
import { makeGetTokenFacade } from '../../../../facades/core/token/make-get-token-facade';

export const makeAuthenticationUra = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueUraRepository = new DialogueUraRepository();
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();
  const sourceMvnoRepository = new SourceMvnoRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueUraRepository,
    customerAuthCodeRepository,
    sourceMvnoRepository,
    makeGetTokenFacade,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};

export const makeAuthenticationSms = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueSmsRepository = new DialogueSmsRepository();
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();
  const sourceMvnoRepository = new SourceMvnoRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueSmsRepository,
    customerAuthCodeRepository,
    sourceMvnoRepository,
    makeGetTokenFacade,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};

export const makeAuthenticationWhats = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();
  const sourceMvnoRepository = new SourceMvnoRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueWhatsAppRepository,
    customerAuthCodeRepository,
    sourceMvnoRepository,
    makeGetTokenFacade,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};
