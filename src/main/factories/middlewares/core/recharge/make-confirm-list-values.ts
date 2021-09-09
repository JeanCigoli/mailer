import { DbConfirmListValues } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { ConfirmListValuesMiddleware } from '../../../../../presentation/middlewares';

export const makeConfirmListValuesWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbConfirmListValues = new DbConfirmListValues(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new ConfirmListValuesMiddleware(dbConfirmListValues);
};

export const makeConfirmListValuesSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbConfirmListValues = new DbConfirmListValues(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
  );

  return new ConfirmListValuesMiddleware(dbConfirmListValues);
};

export const makeConfirmListValuesUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbConfirmListValues = new DbConfirmListValues(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
  );

  return new ConfirmListValuesMiddleware(dbConfirmListValues);
};
