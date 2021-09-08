import { DbListConsumptionStep } from '../../data/usecases/core/main-menu/db-list-consumption-step';
import { ListConsumptionStep } from '../../domain/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../infra/core/db/mssql';
import { listConsumptionFacade } from './list-consumption-facade';

export const listConsumptionStepFacadeWhatsApp: ListConsumptionStep.Facade = (
  params,
) => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbListConsumptionStep = new DbListConsumptionStep(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
    listConsumptionFacade,
  );

  return dbListConsumptionStep.list(params);
};

export const listConsumptionStepFacadeSms: ListConsumptionStep.Facade = (
  params,
) => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbListConsumptionStep = new DbListConsumptionStep(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
    listConsumptionFacade,
  );

  return dbListConsumptionStep.list(params);
};

export const listConsumptionStepFacadeUra: ListConsumptionStep.Facade = (
  params,
) => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbListConsumptionStep = new DbListConsumptionStep(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
    listConsumptionFacade,
  );

  return dbListConsumptionStep.list(params);
};
