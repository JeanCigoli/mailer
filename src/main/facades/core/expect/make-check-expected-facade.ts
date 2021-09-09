import { DbCheckExpected } from '../../../../data/usecases/core';
import { CheckExpected } from '../../../../domain/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
} from '../../../../infra/core/db/mssql';

export const makeCheckExpectedFacadeWhats: CheckExpected.Facade = (params) => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();

  const dbCheckExpected = new DbCheckExpected(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
  );

  return dbCheckExpected.check(params);
};

export const makeCheckExpectedFacadeSms: CheckExpected.Facade = (params) => {
  const dialogueSmsRepository = new DialogueSmsRepository();

  const dbCheckExpected = new DbCheckExpected(
    dialogueSmsRepository,
    dialogueSmsRepository,
  );

  return dbCheckExpected.check(params);
};

export const makeCheckExpectedFacadeUra: CheckExpected.Facade = (params) => {
  const dialogueUraRepository = new DialogueUraRepository();

  const dbCheckExpected = new DbCheckExpected(
    dialogueUraRepository,
    dialogueUraRepository,
  );

  return dbCheckExpected.check(params);
};
