import { adaptListenerJob } from '../../adapters/adapt-listener-job';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import { makeListCardsJobSms } from '../../factories/controller/sms/card/make-list-cards-job-sms';
import { makeConsumptionJobSms } from '../../factories/controller/sms/consumption/make-consumption-job-sms';
import { makeSuccessJobSms } from '../../factories/controller/sms/default/make-success-job-sms';
import { makePlanValuesJobSms } from '../../factories/controller/sms/plan-values/make-plan-values-job-sms';
import { makeTokenJobSms } from '../../factories/controller/sms/token/make-token-job-sms';

export const formatSmsSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 3 },
    handle: adaptListenerJob(makeTokenJobSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 5 },
    handle: adaptListenerJob(makeConsumptionJobSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptListenerJob(makePlanValuesJobSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptListenerJob(makeListCardsJobSms()),
  },
  {
    handle: adaptListenerJob(makeSuccessJobSms()),
  },
];
