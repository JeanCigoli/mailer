import { DbVerifyMainMenu } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { MainMenuMiddleware } from '../../../../../presentation/middlewares/main-menu/main-menu-middleware';
import {
  makeListConsumptionStepFacadeSms,
  makeListConsumptionStepFacadeUra,
  makeListConsumptionStepFacadeWhatsApp,
} from '../../../../facades/core';

export const makeMainMenuWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbVerifyMainMenu = new DbVerifyMainMenu(
    dialogueWhatsAppRepository,
    dialogueWhatsAppRepository,
    stepRepository,
    makeListConsumptionStepFacadeWhatsApp,
  );

  return new MainMenuMiddleware(dbVerifyMainMenu);
};

export const makeMainMenuSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbVerifyMainMenu = new DbVerifyMainMenu(
    dialogueSmsRepository,
    dialogueSmsRepository,
    stepRepository,
    makeListConsumptionStepFacadeSms,
  );

  return new MainMenuMiddleware(dbVerifyMainMenu);
};

export const makeMainMenuUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbVerifyMainMenu = new DbVerifyMainMenu(
    dialogueUraRepository,
    dialogueUraRepository,
    stepRepository,
    makeListConsumptionStepFacadeUra,
  );

  return new MainMenuMiddleware(dbVerifyMainMenu);
};
