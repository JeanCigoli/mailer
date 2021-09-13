import { SmsBodyJob } from '../../../../presentation/middlewares/sms/sms-body-job';

export const makeSmsBodyJob = () => {
  return new SmsBodyJob();
};
