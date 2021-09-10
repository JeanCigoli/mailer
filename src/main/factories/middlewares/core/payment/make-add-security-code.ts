import { DbAddSecurityCode } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
} from '../../../../../infra/core/db/mssql';
import { AddSecurityCodeMiddleware } from '../../../../../presentation/middlewares';
import {
  makeAddCardAndRechargeStepFacadeSms,
  makeAddCardAndRechargeStepFacadeUra,
  makeAddCardAndRechargeStepFacadeWhats,
  makeAddCardStepFacadeSms,
  makeAddCardStepFacadeUra,
  makeAddCardStepFacadeWhats,
  makeSendRechargeStepFacadeSms,
  makeSendRechargeStepFacadeUra,
  makeSendRechargeStepFacadeWhats,
} from '../../../../facades/core';

export const makeAddSecurityCodeWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();

  const dbAddSecurityCode = new DbAddSecurityCode(
    dialogueWhatsAppRepository,
    makeAddCardStepFacadeWhats,
    makeAddCardAndRechargeStepFacadeWhats,
    makeSendRechargeStepFacadeWhats,
  );

  return new AddSecurityCodeMiddleware(dbAddSecurityCode);
};

export const makeAddSecurityCodeSms = () => {
  const dialogueWhatsAppRepository = new DialogueSmsRepository();

  const dbAddSecurityCode = new DbAddSecurityCode(
    dialogueWhatsAppRepository,
    makeAddCardStepFacadeSms,
    makeAddCardAndRechargeStepFacadeSms,
    makeSendRechargeStepFacadeSms,
  );

  return new AddSecurityCodeMiddleware(dbAddSecurityCode);
};

export const makeAddSecurityCodeUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();

  const dbAddSecurityCode = new DbAddSecurityCode(
    dialogueUraRepository,
    makeAddCardStepFacadeUra,
    makeAddCardAndRechargeStepFacadeUra,
    makeSendRechargeStepFacadeUra,
  );

  return new AddSecurityCodeMiddleware(dbAddSecurityCode);
};
