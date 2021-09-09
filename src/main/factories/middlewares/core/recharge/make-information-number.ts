import { DbInformationNumber } from '../../../../../data/usecases/core';
import {
  AccountRepository,
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { InformationNumberMiddleware } from '../../../../../presentation/middlewares';
import { validAndFormatterMsisdn } from '../../../../../utils/validation';

export const makeInformationNumberWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();
  const accountRepository = new AccountRepository();

  const dbInformationNumber = new DbInformationNumber(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
    accountRepository,
    validAndFormatterMsisdn,
  );

  return new InformationNumberMiddleware(dbInformationNumber);
};

export const makeInformationNumberSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();
  const accountRepository = new AccountRepository();

  const dbInformationNumber = new DbInformationNumber(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
    accountRepository,
    validAndFormatterMsisdn,
  );

  return new InformationNumberMiddleware(dbInformationNumber);
};

export const makeInformationNumberUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();
  const accountRepository = new AccountRepository();

  const dbInformationNumber = new DbInformationNumber(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
    accountRepository,
    validAndFormatterMsisdn,
  );

  return new InformationNumberMiddleware(dbInformationNumber);
};
