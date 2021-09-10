import { DbMenuCards } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { MenuCardsMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';
import { makeListCardsFacade } from '../../../../facades/core/card/make-list-cards-facade';

export const makeCardsMenuWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbVerifyCardsMenu = new DbMenuCards(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
    makeListCardsFacade,
  );

  return new MenuCardsMiddleware(dbVerifyCardsMenu);
};

export const makeCardsMenuSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbVerifyCardsMenu = new DbMenuCards(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
    makeListCardsFacade,
  );

  return new MenuCardsMiddleware(dbVerifyCardsMenu);
};

export const makeCardsMenuUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbVerifyCardsMenu = new DbMenuCards(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
    makeListCardsFacade,
  );

  return new MenuCardsMiddleware(dbVerifyCardsMenu);
};
