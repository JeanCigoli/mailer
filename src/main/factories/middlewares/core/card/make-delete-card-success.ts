import { DbDeleteCardSuccess } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { DeleteCardSuccessMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';

export const makeDeleteCardSuccessWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbDeleteCardSuccess = new DbDeleteCardSuccess(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new DeleteCardSuccessMiddleware(dbDeleteCardSuccess);
};

export const makeDeleteCardSuccessSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbDeleteCardSuccess = new DbDeleteCardSuccess(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
  );

  return new DeleteCardSuccessMiddleware(dbDeleteCardSuccess);
};

export const makeDeleteCardSuccessUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbDeleteCardSuccess = new DbDeleteCardSuccess(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
  );

  return new DeleteCardSuccessMiddleware(dbDeleteCardSuccess);
};
