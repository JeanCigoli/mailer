import { DbVerifyStep } from '../../../../data/usecases/dialogue';
import { DialogueSmsRepository } from '../../../../infra/core/db';
import { StepSourceRepository } from '../../../../infra/core/db/step/step-source-repository';
import { VerifyStepMiddleware } from '../../../../presentation/middlewares/verify-step-middleware';

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
