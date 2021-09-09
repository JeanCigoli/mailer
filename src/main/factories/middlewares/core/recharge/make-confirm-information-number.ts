import { DbConfirmInformationNumber } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { ConfirmInformationNumberMiddleware } from '../../../../../presentation/middlewares';

export const makeConfirmInformationNumberWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbConfirmInformationNumber = new DbConfirmInformationNumber(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new ConfirmInformationNumberMiddleware(dbConfirmInformationNumber);
};

export const makeConfirmInformationNumberSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbConfirmInformationNumber = new DbConfirmInformationNumber(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
  );

  return new ConfirmInformationNumberMiddleware(dbConfirmInformationNumber);
};

export const makeConfirmInformationNumberUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbConfirmInformationNumber = new DbConfirmInformationNumber(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
  );

  return new ConfirmInformationNumberMiddleware(dbConfirmInformationNumber);
};
