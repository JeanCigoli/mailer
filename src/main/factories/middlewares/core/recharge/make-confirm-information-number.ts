import { DbConfirmInformationNumber } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { ConfirmInformationNumberMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
  makeValidateAccountFacade,
} from '../../../../facades/core';

export const makeConfirmInformationNumberWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbConfirmInformationNumber = new DbConfirmInformationNumber(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
    makeValidateAccountFacade,
  );

  return new ConfirmInformationNumberMiddleware(dbConfirmInformationNumber);
};

export const makeConfirmInformationNumberSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbConfirmInformationNumber = new DbConfirmInformationNumber(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
    makeValidateAccountFacade,
  );

  return new ConfirmInformationNumberMiddleware(dbConfirmInformationNumber);
};

export const makeConfirmInformationNumberUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbConfirmInformationNumber = new DbConfirmInformationNumber(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
    makeValidateAccountFacade,
  );

  return new ConfirmInformationNumberMiddleware(dbConfirmInformationNumber);
};
