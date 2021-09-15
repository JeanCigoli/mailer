import { DbAddValidityCard } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { AddValidityCardMiddleware } from '../../../../../presentation/middlewares';
import { validValidityCard } from '../../../../../utils/validation';
import {
  makeSendMaximumAttemptsFacadeSms,
  makeSendMaximumAttemptsFacadeUra,
  makeSendMaximumAttemptsFacadeWhats,
} from '../../../../facades/core';

export const makeAddValidityCardWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbAddValidityCard = new DbAddValidityCard(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
    validValidityCard,
    makeSendMaximumAttemptsFacadeWhats,
  );

  return new AddValidityCardMiddleware(dbAddValidityCard);
};

export const makeAddValidityCardSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbAddValidityCard = new DbAddValidityCard(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
    validValidityCard,
    makeSendMaximumAttemptsFacadeSms,
  );

  return new AddValidityCardMiddleware(dbAddValidityCard);
};

export const makeAddValidityCardUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbAddValidityCard = new DbAddValidityCard(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
    validValidityCard,
    makeSendMaximumAttemptsFacadeUra,
  );

  return new AddValidityCardMiddleware(dbAddValidityCard);
};
