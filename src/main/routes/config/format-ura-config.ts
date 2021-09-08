import { adaptRoute } from '../../adapters/adapt-route';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import { makeListCardsControllerUra } from '../../factories/ura/card/make-list-cards-controller-ura';
import { makeErrorControllerUra } from '../../factories/ura/default/make-error-controller-ura';
import { makeSuccessControllerUra } from '../../factories/ura/default/make-success-controller-ura';
import { makeIndexController } from '../../factories/ura/index/make-index-controller';
import { makeRechargePlanValuesControllerUra } from '../../factories/ura/plan-values/make-plan-values-controller-ura';

export const formatUraSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: adaptRoute(makeIndexController()),
  },
  // {
  //   target: { step: 'stepId' },
  //   expected: { stepId: 2 },
  //   handle: adaptRoute(makeSuccessControllerUra()),
  // },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 6 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 7 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 8 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 9 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 10 },
    handle: adaptRoute(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 11 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 12 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptRoute(makeRechargePlanValuesControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 14 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 15 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptRoute(makeListCardsControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 17 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 18 },
    handle: adaptRoute(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 19 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 20 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 21 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 22 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 23 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 24 },
    handle: adaptRoute(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 25 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 26 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 27 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 28 },
    handle: adaptRoute(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 29 },
    handle: adaptRoute(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 30 },
    handle: adaptRoute(makeErrorControllerUra()),
  },
];
