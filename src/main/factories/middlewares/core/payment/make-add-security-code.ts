import { DbAddSecurityCode } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { AddSecurityCodeMiddleware } from '../../../../../presentation/middlewares';
import { validateSecurityCode } from '../../../../../utils/validation';
import {
  makeAddCardAndRechargeStepFacadeSms,
  makeAddCardAndRechargeStepFacadeUra,
  makeAddCardAndRechargeStepFacadeWhats,
  makeAddCardStepFacadeSms,
  makeAddCardStepFacadeUra,
  makeAddCardStepFacadeWhats,
  makeSendMaximumAttemptsFacadeSms,
  makeSendMaximumAttemptsFacadeUra,
  makeSendMaximumAttemptsFacadeWhats,
  makeSendRechargeStepFacadeSms,
  makeSendRechargeStepFacadeUra,
  makeSendRechargeStepFacadeWhats,
} from '../../../../facades/core';

export const makeAddSecurityCodeWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbAddSecurityCode = new DbAddSecurityCode(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
    makeAddCardStepFacadeWhats,
    makeAddCardAndRechargeStepFacadeWhats,
    makeSendRechargeStepFacadeWhats,
    makeSendMaximumAttemptsFacadeWhats,
    validateSecurityCode,
  );

  return new AddSecurityCodeMiddleware(dbAddSecurityCode);
};

export const makeAddSecurityCodeSms = () => {
  const dialogueWhatsAppRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbAddSecurityCode = new DbAddSecurityCode(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
    makeAddCardStepFacadeSms,
    makeAddCardAndRechargeStepFacadeSms,
    makeSendRechargeStepFacadeSms,
    makeSendMaximumAttemptsFacadeSms,
    validateSecurityCode,
  );

  return new AddSecurityCodeMiddleware(dbAddSecurityCode);
};

export const makeAddSecurityCodeUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbAddSecurityCode = new DbAddSecurityCode(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
    makeAddCardStepFacadeUra,
    makeAddCardAndRechargeStepFacadeUra,
    makeSendRechargeStepFacadeUra,
    makeSendMaximumAttemptsFacadeUra,
    validateSecurityCode,
  );

  return new AddSecurityCodeMiddleware(dbAddSecurityCode);
};
