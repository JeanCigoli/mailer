import { adaptRouteXml } from '../../adapters/adapt-route-xml';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeListCardsControllerUra,
  makeConsumptionControllerUra,
  makeDefaultControllerUra,
  makeRechargePlanValuesControllerUra,
  makeTokenControllerUra,
  makeMenuController,
  makeConfirmAddMsisdnUra,
  makeConfirmRechargeUra,
  makeDeleteCardSuccessUra,
  makeConfirmAddCardUra,
  makeValidatePlanValuesOptionControllerUra,
  makeTransferControllerUra,
} from '../../factories/controller/ura';

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
    expected: { stepId: 7 },
    handle: adaptRouteXml(makeTransferControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 11 },
    handle: adaptRouteXml(makeConfirmAddMsisdnUra()),
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
    expected: { stepId: 21 },
    handle: adaptRouteXml(makeConfirmRechargeUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 26 },
    handle: adaptRouteXml(makeConfirmAddCardUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 28 },
    handle: adaptRouteXml(makeListCardsControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 29 },
    handle: adaptRouteXml(makeDeleteCardSuccessUra()),
  },
  {
    handle: adaptRouteXml(makeDefaultControllerUra()),
  },
];
