import { DbAddNumberCard } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { AddNumberCardMiddleware } from '../../../../../presentation/middlewares';
import { validCardNumber } from '../../../../../utils/validation';
import {
  makeSendMaximumAttemptsFacadeSms,
  makeSendMaximumAttemptsFacadeUra,
  makeSendMaximumAttemptsFacadeWhats,
} from '../../../../facades/core';

export const makeAddNumberCardWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbAddNumberCard = new DbAddNumberCard(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
    validCardNumber,
    makeSendMaximumAttemptsFacadeWhats,
  );

  return new AddNumberCardMiddleware(dbAddNumberCard);
};

export const makeAddNumberCardSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbAddNumberCard = new DbAddNumberCard(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
    validCardNumber,
    makeSendMaximumAttemptsFacadeSms,
  );

  return new AddNumberCardMiddleware(dbAddNumberCard);
};

export const makeAddNumberCardUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbAddNumberCard = new DbAddNumberCard(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
    validCardNumber,
    makeSendMaximumAttemptsFacadeUra,
  );

  return new AddNumberCardMiddleware(dbAddNumberCard);
};
