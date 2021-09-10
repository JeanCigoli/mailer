import { DbAddCardStep } from '../../../../data/usecases/core';
import { AddCardStep } from '../../../../domain/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../infra/core/db/mssql';
import { makeAddCardFacade } from '../card/make-add-card-facade';

export const makeAddCardStepFacadeWhats: AddCardStep.Facade = (params) => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbAddCardStep = new DbAddCardStep(
    dialogueWhatsAppRepository,
    stepRepository,
    makeAddCardFacade,
  );

  return dbAddCardStep.add(params);
};

export const makeAddCardStepFacadeSms: AddCardStep.Facade = (params) => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbAddCardStep = new DbAddCardStep(
    dialogueSmsRepository,
    stepRepository,
    makeAddCardFacade,
  );

  return dbAddCardStep.add(params);
};
export const makeAddCardStepFacadeUra: AddCardStep.Facade = (params) => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbAddCardStep = new DbAddCardStep(
    dialogueUraRepository,
    stepRepository,
    makeAddCardFacade,
  );

  return dbAddCardStep.add(params);
};
