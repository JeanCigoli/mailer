import { DbMenuToken } from '../../../../../data/usecases/core';
import { CustomerAuthCodeRepository } from '../../../../../infra/core/db/mongo';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { MenuTokenMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';

export const makeMenuTokenUra = () => {
  const customerAuthCodeRepository = new CustomerAuthCodeRepository();
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbMenuToken = new DbMenuToken(
    customerAuthCodeRepository,
    makeCheckExpectedFacadeWhats,
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
    makeCheckExpectedFacadeSms,
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
    makeCheckExpectedFacadeUra,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new MenuTokenMiddleware(dbMenuToken);
};
