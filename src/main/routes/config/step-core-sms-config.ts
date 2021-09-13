import { NextFunction, Request, Response } from 'express';
import { adaptMiddlewareJob } from '../../adapters';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeAddNumberCardSms,
  makeAddSecurityCodeSms,
  makeAddValidityCardSms,
  makeAuthenticationSms,
  makeCardsMenuSms,
  makeConfirmAddCardSms,
  makeConfirmInformationNumberSms,
  makeConfirmListValuesSms,
  makeConfirmPaymentSms,
  makeDeleteCardErrorSms,
  makeDeleteCardStepSms,
  makeDeleteCardSuccessSms,
  makeErrorRechargeInformationSms,
  makeInformationNumberSms,
  makeListValuesSms,
  makeMainMenuSms,
  makeMenuRechargeSms,
  makeMenuTokenSms,
  makeMenuTypePaymentSms,
  makeResendInformationNumberSms,
} from '../../factories/middlewares/core';
import { makeViewsCardsSms } from '../../factories/middlewares/core/payment/make-views-cards';

export const stepCoreSmsSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: adaptMiddlewareJob(makeAuthenticationSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: adaptMiddlewareJob(makeMenuTokenSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptMiddlewareJob(makeMainMenuSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 8 },
    handle: adaptMiddlewareJob(makeMenuRechargeSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 9 },
    handle: adaptMiddlewareJob(makeInformationNumberSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 10 },
    handle: adaptMiddlewareJob(makeResendInformationNumberSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 11 },
    handle: adaptMiddlewareJob(makeConfirmInformationNumberSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 12 },
    handle: adaptMiddlewareJob(makeListValuesSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptMiddlewareJob(makeConfirmListValuesSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 14 },
    handle: adaptMiddlewareJob(makeMenuTypePaymentSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptMiddlewareJob(makeViewsCardsSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 17 },
    handle: adaptMiddlewareJob(makeAddNumberCardSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 19 },
    handle: adaptMiddlewareJob(makeAddValidityCardSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 21 },
    handle: adaptMiddlewareJob(makeConfirmPaymentSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 22 },
    handle: adaptMiddlewareJob(makeAddSecurityCodeSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 24 },
    handle: adaptMiddlewareJob(makeErrorRechargeInformationSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 25 },
    handle: adaptMiddlewareJob(makeCardsMenuSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 26 },
    handle: adaptMiddlewareJob(makeConfirmAddCardSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 28 },
    handle: adaptMiddlewareJob(makeDeleteCardStepSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 29 },
    handle: adaptMiddlewareJob(makeDeleteCardSuccessSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 30 },
    handle: adaptMiddlewareJob(makeDeleteCardErrorSms()),
  },
  {
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou na rota default');

      return next();
    },
  },
];
