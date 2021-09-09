import { DbListConsumptionStep } from '../../../../data/usecases/core/main-menu/db-list-consumption-step';
import { ListConsumptionStep } from '../../../../domain/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../infra/core/db/mssql';
import { makeListConsumptionFacade } from './make-list-consumption-facade';

export const makeListConsumptionStepFacadeWhatsApp: ListConsumptionStep.Facade =
  (params) => {
    const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
    const stepRepository = new StepRepository();

    const dbListConsumptionStep = new DbListConsumptionStep(
      dialogueWhatsAppRepository,
      stepRepository,
      makeListConsumptionFacade,
    );

    return dbListConsumptionStep.list(params);
  };

export const makeListConsumptionStepFacadeSms: ListConsumptionStep.Facade = (
  params,
) => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbListConsumptionStep = new DbListConsumptionStep(
    dialogueSmsRepository,
    stepRepository,
    makeListConsumptionFacade,
  );

  return dbListConsumptionStep.list(params);
};

export const makeListConsumptionStepFacadeUra: ListConsumptionStep.Facade = (
  params,
) => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbListConsumptionStep = new DbListConsumptionStep(
    dialogueUraRepository,
    stepRepository,
    makeListConsumptionFacade,
  );

  return dbListConsumptionStep.list(params);
};
