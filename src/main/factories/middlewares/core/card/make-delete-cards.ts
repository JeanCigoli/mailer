import { DbDeleteCardStep } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { DeleteCardStepMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';
import { makeDeleteCardFacade } from '../../../../facades/core/card/make-delete-card-facade';

export const makeDeleteCardStepWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbDeleteCardStep = new DbDeleteCardStep(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
    makeDeleteCardFacade,
  );

  return new DeleteCardStepMiddleware(dbDeleteCardStep);
};

export const makeDeleteCardStepSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbDeleteCardStep = new DbDeleteCardStep(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
    makeDeleteCardFacade,
  );

  return new DeleteCardStepMiddleware(dbDeleteCardStep);
};

export const makeDeleteCardStepUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbDeleteCardStep = new DbDeleteCardStep(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
    makeDeleteCardFacade,
  );

  return new DeleteCardStepMiddleware(dbDeleteCardStep);
};
