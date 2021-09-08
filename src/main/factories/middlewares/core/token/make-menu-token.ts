import { DbMenuToken } from '../../../../../data/usecases/core';
import { CustomerAuthCodeRepository } from '../../../../../infra/core/db/mongo';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { MenuTokenMiddleware } from '../../../../../presentation/middlewares';

export const makeMenuTokenUra = () => {
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbMenuToken = new DbMenuToken(
    customerAuthCodeRepository,
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
  );

  return new MenuTokenMiddleware(dbMenuToken);
};

export const makeMenuTokenSms = () => {
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbMenuToken = new DbMenuToken(
    customerAuthCodeRepository,
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
  );

  return new MenuTokenMiddleware(dbMenuToken);
};

export const makeMenuTokenWhats = () => {
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbMenuToken = new DbMenuToken(
    customerAuthCodeRepository,
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new MenuTokenMiddleware(dbMenuToken);
};
