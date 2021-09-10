import { DbDeleteCardError } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { DeleteCardErrorMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';

export const makeDeleteCardErrorWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbDeleteCardError = new DbDeleteCardError(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new DeleteCardErrorMiddleware(dbDeleteCardError);
};

export const makeDeleteCardErrorSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbDeleteCardError = new DbDeleteCardError(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
  );

  return new DeleteCardErrorMiddleware(dbDeleteCardError);
};

export const makeDeleteCardErrorUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbDeleteCardError = new DbDeleteCardError(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
  );

  return new DeleteCardErrorMiddleware(dbDeleteCardError);
};
