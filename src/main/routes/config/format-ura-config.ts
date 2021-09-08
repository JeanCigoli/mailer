import { adaptRouteXml } from '../../adapters/adapt-route-xml';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import { makeListCardsControllerUra } from '../../factories/ura/card/make-list-cards-controller-ura';
import { makeConsumptionController } from '../../factories/ura/consumption/make-consumption-controller';
import { makeErrorControllerUra } from '../../factories/ura/default/make-error-controller-ura';
import { makeSuccessControllerUra } from '../../factories/ura/default/make-success-controller-ura';
import { makeIndexController } from '../../factories/ura/index/make-index-controller';
import { makeRechargePlanValuesControllerUra } from '../../factories/ura/plan-values/make-plan-values-controller-ura';
import { makeTokenControllerUra } from '../../factories/ura/token/make-token-controller-ura';

export const formatUraSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: adaptRouteXml(makeIndexController()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: adaptRouteXml(makeTokenControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 3 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 5 },
    handle: adaptRouteXml(makeConsumptionController()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 6 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 7 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 8 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 9 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 10 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 11 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 12 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptRouteXml(makeRechargePlanValuesControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 14 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 15 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptRouteXml(makeListCardsControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 17 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 18 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 19 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 20 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 21 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 22 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 23 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 24 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 25 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 26 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 27 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 28 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 29 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 30 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 31 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 32 },
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
];
