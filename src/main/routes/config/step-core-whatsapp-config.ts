import { NextFunction, Request, Response } from 'express';
import { adaptMiddleware } from '../../adapters/adapt-middleware';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeAddNumberCardWhats,
  makeAddSecurityCodeWhats,
  makeAddValidityCardWhats,
  makeAuthenticationWhats,
  makeCardsMenuWhats,
  makeConfirmInformationNumberWhats,
  makeConfirmListValuesWhats,
  makeConfirmPaymentWhats,
  makeDeleteCardErrorWhats,
  makeDeleteCardStepWhats,
  makeDeleteCardSuccessWhats,
  makeErrorRechargeInformationWhats,
  makeInformationNumberWhats,
  makeListValuesWhats,
  makeMainMenuWhats,
  makeMenuRechargeWhats,
  makeMenuTokenWhats,
  makeMenuTypePaymentWhats,
  makeResendInformationNumberWhats,
} from '../../factories/middlewares/core';
import { makeViewsCardsWhats } from '../../factories/middlewares/core/payment/make-views-cards';

export const stepCoreWhatsAppSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: adaptMiddleware(makeAuthenticationWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: adaptMiddleware(makeMenuTokenWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptMiddleware(makeMainMenuWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 8 },
    handle: adaptMiddleware(makeMenuRechargeWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 9 },
    handle: adaptMiddleware(makeInformationNumberWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 10 },
    handle: adaptMiddleware(makeResendInformationNumberWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 11 },
    handle: adaptMiddleware(makeConfirmInformationNumberWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 12 },
    handle: adaptMiddleware(makeListValuesWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptMiddleware(makeConfirmListValuesWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 14 },
    handle: adaptMiddleware(makeMenuTypePaymentWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptMiddleware(makeViewsCardsWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 17 },
    handle: adaptMiddleware(makeAddNumberCardWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 19 },
    handle: adaptMiddleware(makeAddValidityCardWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 21 },
    handle: adaptMiddleware(makeConfirmPaymentWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 22 },
    handle: adaptMiddleware(makeAddSecurityCodeWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 24 },
    handle: adaptMiddleware(makeErrorRechargeInformationWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 25 },
    handle: adaptMiddleware(makeCardsMenuWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 28 },
    handle: adaptMiddleware(makeDeleteCardStepWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 29 },
    handle: adaptMiddleware(makeDeleteCardSuccessWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 30 },
    handle: adaptMiddleware(makeDeleteCardErrorWhats()),
  },
  {
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou na rota default');

      console.log(req.step);

      return next();
    },
  },
];
