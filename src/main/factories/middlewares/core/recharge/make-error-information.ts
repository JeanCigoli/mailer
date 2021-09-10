import { DbErrorRechargeInformation } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { ErrorRechargeInformationMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';

export const makeErrorRechargeInformationWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbErrorRechargeInformation = new DbErrorRechargeInformation(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new ErrorRechargeInformationMiddleware(dbErrorRechargeInformation);
};

export const makeErrorRechargeInformationSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbErrorRechargeInformation = new DbErrorRechargeInformation(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
  );

  return new ErrorRechargeInformationMiddleware(dbErrorRechargeInformation);
};

export const makeErrorRechargeInformationUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbErrorRechargeInformation = new DbErrorRechargeInformation(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
  );

  return new ErrorRechargeInformationMiddleware(dbErrorRechargeInformation);
};
