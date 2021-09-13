import { SmsBodyMiddleware } from '../../../../presentation/middlewares/sms/sms-body-middleware';

export const makeSmsBodyMiddleware = () => {
  return new SmsBodyMiddleware();
};
