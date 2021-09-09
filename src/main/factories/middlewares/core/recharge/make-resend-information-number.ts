import { DbResendInformationNumber } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { ResendInformationNumberMiddleware } from '../../../../../presentation/middlewares';

export const makeResendInformationNumberWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbResendInformationNumber = new DbResendInformationNumber(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new ResendInformationNumberMiddleware(dbResendInformationNumber);
};

export const makeResendInformationNumberSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbResendInformationNumber = new DbResendInformationNumber(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
  );

  return new ResendInformationNumberMiddleware(dbResendInformationNumber);
};

export const makeResendInformationNumberUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbResendInformationNumber = new DbResendInformationNumber(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
  );

  return new ResendInformationNumberMiddleware(dbResendInformationNumber);
};
