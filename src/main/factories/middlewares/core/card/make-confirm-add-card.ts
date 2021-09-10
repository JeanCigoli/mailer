import { DbConfirmAddCard } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { ConfirmAddCardMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';

export const makeConfirmAddCardWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbConfirmAddCard = new DbConfirmAddCard(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new ConfirmAddCardMiddleware(dbConfirmAddCard);
};

export const makeConfirmAddCardSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbConfirmAddCard = new DbConfirmAddCard(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
  );

  return new ConfirmAddCardMiddleware(dbConfirmAddCard);
};

export const makeConfirmAddCardUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbConfirmAddCard = new DbConfirmAddCard(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
  );

  return new ConfirmAddCardMiddleware(dbConfirmAddCard);
};
