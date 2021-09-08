import { DbVerifyStep } from '../../../../data/usecases/dialogue';
import {
  DialogueWhatsAppRepository,
  StepSourceRepository,
} from '../../../../infra/core/db/mssql';
import { VerifyStepMiddleware } from '../../../../presentation/middlewares';

export const makeVerifyStepWhatsApp = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepSourceRepository = new StepSourceRepository();

  const dbVerifyStep = new DbVerifyStep(
    dialogueWhatsAppRepository,
    stepSourceRepository,
    stepSourceRepository,
  );

  return new VerifyStepMiddleware(dbVerifyStep);
};
