import { DbConfirmPayment } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { ConfirmPaymentMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';
import { makeListCardsFacade } from '../../../../facades/core/card/make-list-cards-facade';

export const makeConfirmPaymentWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbConfirmPayment = new DbConfirmPayment(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
    makeListCardsFacade,
  );

  return new ConfirmPaymentMiddleware(dbConfirmPayment);
};

export const makeConfirmPaymentSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbConfirmPayment = new DbConfirmPayment(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
    makeListCardsFacade,
  );

  return new ConfirmPaymentMiddleware(dbConfirmPayment);
};

export const makeConfirmPaymentUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbConfirmPayment = new DbConfirmPayment(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
    makeListCardsFacade,
  );

  return new ConfirmPaymentMiddleware(dbConfirmPayment);
};
