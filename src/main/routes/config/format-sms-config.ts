import { adaptRoute } from '../../adapters/adapt-route';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import { makeSuccessControllerSms } from '../../factories/sms/default/make-success-controller-sms';

export const formatSmsSwitchConfig: adapterOptions = [
  {
    handle: adaptRoute(makeSuccessControllerSms()),
  },
  // {
  //   target: { step : 'stepId' },
  //   expected: { stepId: 1 },
  //   handle: ,
  // },
];
