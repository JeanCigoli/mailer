import { adaptRoute } from '../../adapters/adapt-route';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import { makeListCardsControllerSms } from '../../factories/controller/sms/card/make-list-cards-controller-sms';
import { makeConsumptionControllerSms } from '../../factories/controller/sms/consumption/make-consumption-controller-sms';
import { makeSuccessControllerSms } from '../../factories/controller/sms/default/make-success-controller-sms';
import { makePlanValuesControllerSms } from '../../factories/controller/sms/plan-values/make-plan-values-controller-sms';
import { makeTokenControllerSms } from '../../factories/controller/sms/token/make-token-controller-sms';

export const formatSmsSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 3 },
    handle: adaptRoute(makeTokenControllerSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 5 },
    handle: adaptRoute(makeConsumptionControllerSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptRoute(makePlanValuesControllerSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptRoute(makeListCardsControllerSms()),
  },
  {
    handle: adaptRoute(makeSuccessControllerSms()),
  },
];
