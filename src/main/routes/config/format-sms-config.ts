import { adaptListenerJob } from '../../adapters/adapt-listener-job';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import { makeListCardsJobSms } from '../../factories/jobs/sms/card/make-list-cards-job-sms';
import { makeConsumptionJobSms } from '../../factories/jobs/sms/consumption/make-consumption-job-sms';
import { makeSuccessJobSms } from '../../factories/jobs/sms/default/make-success-job-sms';
import { makePlanValuesJobSms } from '../../factories/jobs/sms/plan-values/make-plan-values-job-sms';
import { makeValidatePlanValuesOptionJobSms } from '../../factories/jobs/sms/plan-values/make-validate-plan-values-option-job-sms';
import { makeTokenJobSms } from '../../factories/jobs/sms/token/make-token-job-sms';

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
    expected: { stepId: 12 },
    handle: adaptListenerJob(makeValidatePlanValuesOptionJobSms()),
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
