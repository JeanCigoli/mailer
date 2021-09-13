import { NextFunction, Request, Response } from 'express';
import { adaptMiddlewareJob } from '../../adapters';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeAddNumberCardWhats,
  makeAddSecurityCodeWhats,
  makeAddValidityCardWhats,
  makeAuthenticationWhats,
  makeCardsMenuWhats,
  makeConfirmAddCardWhats,
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
    handle: adaptMiddlewareJob(makeAuthenticationWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: adaptMiddlewareJob(makeMenuTokenWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptMiddlewareJob(makeMainMenuWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 8 },
    handle: adaptMiddlewareJob(makeMenuRechargeWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 9 },
    handle: adaptMiddlewareJob(makeInformationNumberWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 10 },
    handle: adaptMiddlewareJob(makeResendInformationNumberWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 11 },
    handle: adaptMiddlewareJob(makeConfirmInformationNumberWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 12 },
    handle: adaptMiddlewareJob(makeListValuesWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptMiddlewareJob(makeConfirmListValuesWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 14 },
    handle: adaptMiddlewareJob(makeMenuTypePaymentWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptMiddlewareJob(makeViewsCardsWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 17 },
    handle: adaptMiddlewareJob(makeAddNumberCardWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 19 },
    handle: adaptMiddlewareJob(makeAddValidityCardWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 21 },
    handle: adaptMiddlewareJob(makeConfirmPaymentWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 22 },
    handle: adaptMiddlewareJob(makeAddSecurityCodeWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 24 },
    handle: adaptMiddlewareJob(makeErrorRechargeInformationWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 25 },
    handle: adaptMiddlewareJob(makeCardsMenuWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 26 },
    handle: adaptMiddlewareJob(makeConfirmAddCardWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 28 },
    handle: adaptMiddlewareJob(makeDeleteCardStepWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 29 },
    handle: adaptMiddlewareJob(makeDeleteCardSuccessWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 30 },
    handle: adaptMiddlewareJob(makeDeleteCardErrorWhats()),
  },
  {
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou na rota default');

      return next();
    },
  },
];
