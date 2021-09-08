import { DbVerifyStep } from '../../../../data/usecases/dialogue';
import {
  DialogueUraRepository,
  StepSourceRepository,
} from '../../../../infra/core/db/mssql';
import { VerifyStepMiddleware } from '../../../../presentation/middlewares';

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
