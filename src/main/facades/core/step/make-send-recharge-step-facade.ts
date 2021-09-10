import { DbSendRechargeStep } from '../../../../data/usecases/core';
import { SendRechargeStep } from '../../../../domain/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../infra/core/db/mssql';
import { makeExecuteRechargeByCreditCardFacade } from '../recharge/make-execute-recharge-by-credit-card-facade';

export const makeSendRechargeStepFacadeWhats: SendRechargeStep.Facade = (
  params,
) => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbSendRechargeStep = new DbSendRechargeStep(
    dialogueWhatsAppRepository,
    stepRepository,
    makeExecuteRechargeByCreditCardFacade,
  );

  return dbSendRechargeStep.send(params);
};

export const makeSendRechargeStepFacadeSms: SendRechargeStep.Facade = (
  params,
) => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbSendRechargeStep = new DbSendRechargeStep(
    dialogueSmsRepository,
    stepRepository,
    makeExecuteRechargeByCreditCardFacade,
  );

  return dbSendRechargeStep.send(params);
};
export const makeSendRechargeStepFacadeUra: SendRechargeStep.Facade = (
  params,
) => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbSendRechargeStep = new DbSendRechargeStep(
    dialogueUraRepository,
    stepRepository,
    makeExecuteRechargeByCreditCardFacade,
  );

  return dbSendRechargeStep.send(params);
};
