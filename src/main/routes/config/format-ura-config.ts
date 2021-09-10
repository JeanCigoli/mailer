import { adaptRouteXml } from '../../adapters/adapt-route-xml';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeListCardsControllerUra,
  makeConsumptionControllerUra,
  makeErrorControllerUra,
  makeSuccessControllerUra,
  makeIndexController,
  makeRechargePlanValuesControllerUra,
  makeTokenControllerUra,
} from '../../factories/controller/ura';

export const formatUraSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: adaptRouteXml(makeIndexController()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 3 },
    handle: adaptRouteXml(makeTokenControllerUra()),
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
    handle: adaptRouteXml(makeSuccessControllerUra()),
  },
];
