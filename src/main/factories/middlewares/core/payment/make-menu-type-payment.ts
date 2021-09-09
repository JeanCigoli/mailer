import { DbMenuTypePayment } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { MenuTypePaymentMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';
import { makeListCardsFacade } from '../../../../facades/core/card/make-list-cards-facade';
import { makeExecuteRechargeByBilletFacade } from '../../../../facades/core/recharge/make-execute-recharge-by-billet-facade';

export const makeMenuTypePaymentWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbMenuTypePayment = new DbMenuTypePayment(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
    makeExecuteRechargeByBilletFacade,
    makeListCardsFacade,
  );

  return new MenuTypePaymentMiddleware(dbMenuTypePayment);
};

export const makeMenuTypePaymentSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbMenuTypePayment = new DbMenuTypePayment(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
    makeExecuteRechargeByBilletFacade,
    makeListCardsFacade,
  );

  return new MenuTypePaymentMiddleware(dbMenuTypePayment);
};

export const makeMenuTypePaymentUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbMenuTypePayment = new DbMenuTypePayment(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
    makeExecuteRechargeByBilletFacade,
    makeListCardsFacade,
  );

  return new MenuTypePaymentMiddleware(dbMenuTypePayment);
};
