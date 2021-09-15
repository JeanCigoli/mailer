import { DbSendMaximumAttempts } from '../../../../data/usecases/core';
import { SendMaximumAttempts } from '../../../../domain/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../infra/core/db/mssql';

export const makeSendMaximumAttemptsFacadeWhats: SendMaximumAttempts.Facade = (
  params,
) => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbSendMaximumAttempts = new DbSendMaximumAttempts(
    stepRepository,
    dialogueWhatsAppRepository,
  );

  return dbSendMaximumAttempts.send(params);
};

export const makeSendMaximumAttemptsFacadeSms: SendMaximumAttempts.Facade = (
  params,
) => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbSendMaximumAttempts = new DbSendMaximumAttempts(
    stepRepository,
    dialogueSmsRepository,
  );

  return dbSendMaximumAttempts.send(params);
};

export const makeSendMaximumAttemptsFacadeUra: SendMaximumAttempts.Facade = (
  params,
) => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbSendMaximumAttempts = new DbSendMaximumAttempts(
    stepRepository,
    dialogueUraRepository,
  );

  return dbSendMaximumAttempts.send(params);
};
