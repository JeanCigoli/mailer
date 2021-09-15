import { DbCheckExpected } from '../../../../data/usecases/core';
import { CheckExpected } from '../../../../domain/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../infra/core/db/mssql';

export const makeCheckExpectedFacadeWhats: CheckExpected.Facade = (params) => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbCheckExpected = new DbCheckExpected(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return dbCheckExpected.check(params);
};

export const makeCheckExpectedFacadeSms: CheckExpected.Facade = (params) => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbCheckExpected = new DbCheckExpected(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
  );

  return dbCheckExpected.check(params);
};

export const makeCheckExpectedFacadeUra: CheckExpected.Facade = (params) => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbCheckExpected = new DbCheckExpected(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
  );

  return dbCheckExpected.check(params);
};
