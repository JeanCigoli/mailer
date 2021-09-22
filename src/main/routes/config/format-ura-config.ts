import { adaptRouteXml } from '../../adapters/adapt-route-xml';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeListCardsControllerUra,
  makeConsumptionControllerUra,
  makeErrorControllerUra,
  makeSuccessControllerUra,
  makeRechargePlanValuesControllerUra,
  makeTokenControllerUra,
  makeMenuController,
} from '../../factories/controller/ura';
import { makeValidatePlanValuesOptionControllerUra } from '../../factories/controller/ura/plan-values/make-validate-plan-values-option-controller-ura';

export const formatUraSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: adaptRouteXml(makeMenuController()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 3 },
    handle: adaptRouteXml(makeTokenControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptRouteXml(makeMenuController()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 5 },
    handle: adaptRouteXml(makeConsumptionControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 10 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 12 },
    handle: adaptRouteXml(makeValidatePlanValuesOptionControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptRouteXml(makeRechargePlanValuesControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptRouteXml(makeListCardsControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 18 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 24 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 28 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 30 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 32 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 33 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 34 },
    handle: adaptRouteXml(makeErrorControllerUra()),
  },
  {
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
];
