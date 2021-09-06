import { DbAuthentication } from '../../../../../data/usecases/core';
import {
  AccountRepository,
  DialogueUraRepository,
  StepRepository,
} from '../../../../../infra/core/db';
import { AuthenticationMiddleware } from '../../../../../presentation/middlewares';

export const makeAuthentication = () => {
  const accountRepository = new AccountRepository();
  const stepRepository = new StepRepository();
  const dialogueUraRepository = new DialogueUraRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    stepRepository,
    dialogueUraRepository,
  );

  return new AuthenticationMiddleware(dbAuthentication);
};
