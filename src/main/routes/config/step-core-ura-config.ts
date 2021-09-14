import { NextFunction, Request, Response } from 'express';
import { adaptMiddleware } from '../../adapters/adapt-middleware';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeAddNumberCardUra,
  makeAddSecurityCodeUra,
  makeAddValidityCardUra,
  makeAuthenticationUra,
  makeCardsMenuUra,
  makeConfirmAddCardUra,
  makeConfirmInformationNumberUra,
  makeConfirmListValuesUra,
  makeConfirmPaymentUra,
  makeDeleteCardErrorUra,
  makeDeleteCardStepUra,
  makeDeleteCardSuccessUra,
  makeErrorRechargeInformationUra,
  makeInformationNumberUra,
  makeListValuesUra,
  makeMainMenuUra,
  makeMenuRechargeUra,
  makeMenuTokenUra,
  makeMenuTypePaymentUra,
  makeResendInformationNumberUra,
} from '../../factories/middlewares/core';
import { makeViewsCardsUra } from '../../factories/middlewares/core/payment/make-views-cards';

export const stepCoreUraSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: adaptMiddleware(makeAuthenticationUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: adaptMiddleware(makeMenuTokenUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptMiddleware(makeMainMenuUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 8 },
    handle: adaptMiddleware(makeMenuRechargeUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 9 },
    handle: adaptMiddleware(makeInformationNumberUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 10 },
    handle: adaptMiddleware(makeResendInformationNumberUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 11 },
    handle: adaptMiddleware(makeConfirmInformationNumberUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 12 },
    handle: adaptMiddleware(makeListValuesUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptMiddleware(makeConfirmListValuesUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 14 },
    handle: adaptMiddleware(makeMenuTypePaymentUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptMiddleware(makeViewsCardsUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 17 },
    handle: adaptMiddleware(makeAddNumberCardUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 19 },
    handle: adaptMiddleware(makeAddValidityCardUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 21 },
    handle: adaptMiddleware(makeConfirmPaymentUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 22 },
    handle: adaptMiddleware(makeAddSecurityCodeUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 24 },
    handle: adaptMiddleware(makeErrorRechargeInformationUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 25 },
    handle: adaptMiddleware(makeCardsMenuUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 26 },
    handle: adaptMiddleware(makeConfirmAddCardUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 28 },
    handle: adaptMiddleware(makeDeleteCardStepUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 29 },
    handle: adaptMiddleware(makeDeleteCardSuccessUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 30 },
    handle: adaptMiddleware(makeDeleteCardErrorUra()),
  },
  {
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou na rota default');

      return next();
    },
  },
];
