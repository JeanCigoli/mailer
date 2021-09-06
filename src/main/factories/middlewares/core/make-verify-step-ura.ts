import { DbVerifyStep } from '../../../../data/usecases/dialogue';
import { DialogueUraRepository } from '../../../../infra/core/db';
import { StepSourceRepository } from '../../../../infra/core/db/step/step-source-repository';
import { VerifyStepMiddleware } from '../../../../presentation/middlewares/verify-step-middleware';

export const makeVerifyStepUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepSourceRepository = new StepSourceRepository();

  const dbVerifyStep = new DbVerifyStep(
    dialogueUraRepository,
    stepSourceRepository,
    stepSourceRepository,
  );

  return new VerifyStepMiddleware(dbVerifyStep);
};
