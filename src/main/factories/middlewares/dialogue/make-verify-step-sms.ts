import { DbVerifyStep } from '../../../../data/usecases/dialogue';
import {
  DialogueSmsRepository,
  StepSourceRepository,
} from '../../../../infra/core/db/mssql';
import { VerifyStepMiddleware } from '../../../../presentation/middlewares';

export const makeVerifyStepSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepSourceRepository = new StepSourceRepository();

  const dbVerifyStep = new DbVerifyStep(
    dialogueSmsRepository,
    stepSourceRepository,
    stepSourceRepository,
  );

  return new VerifyStepMiddleware(dbVerifyStep);
};
