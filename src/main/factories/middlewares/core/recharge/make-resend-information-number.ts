import { DbResendInformationNumber } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { ResendInformationNumberMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';

export const makeResendInformationNumberWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbResendInformationNumber = new DbResendInformationNumber(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new ResendInformationNumberMiddleware(dbResendInformationNumber);
};

export const makeResendInformationNumberSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbResendInformationNumber = new DbResendInformationNumber(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
  );

  return new ResendInformationNumberMiddleware(dbResendInformationNumber);
};

export const makeResendInformationNumberUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbResendInformationNumber = new DbResendInformationNumber(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
  );

  return new ResendInformationNumberMiddleware(dbResendInformationNumber);
};
