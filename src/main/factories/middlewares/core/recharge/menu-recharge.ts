import { DbRechargeMenu } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { MenuRechargeMiddleware } from '../../../../../presentation/middlewares';

export const makeMenuRechargeWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbRechargeMenu = new DbRechargeMenu(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
  );

  return new MenuRechargeMiddleware(dbRechargeMenu);
};

export const makeMenuRechargeSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbRechargeMenu = new DbRechargeMenu(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
  );

  return new MenuRechargeMiddleware(dbRechargeMenu);
};

export const makeMenuRechargeUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbRechargeMenu = new DbRechargeMenu(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
  );

  return new MenuRechargeMiddleware(dbRechargeMenu);
};
