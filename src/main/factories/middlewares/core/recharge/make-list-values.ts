import { DbListValues } from '../../../../../data/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../../infra/core/db/mssql';
import { ListValuesMiddleware } from '../../../../../presentation/middlewares';
import {
  makeCheckExpectedFacadeSms,
  makeCheckExpectedFacadeUra,
  makeCheckExpectedFacadeWhats,
} from '../../../../facades/core';
import { makeListPlanValuesFacade } from '../../../../facades/core/plan-values/make-list-plan-values-facade';

export const makeListValuesWhats = () => {
  const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
  const stepRepository = new StepRepository();

  const dbListValues = new DbListValues(
    makeCheckExpectedFacadeWhats,
    dialogueWhatsAppRepository,
    stepRepository,
    makeListPlanValuesFacade,
  );

  return new ListValuesMiddleware(dbListValues);
};

export const makeListValuesSms = () => {
  const dialogueSmsRepository = new DialogueSmsRepository();
  const stepRepository = new StepRepository();

  const dbListValues = new DbListValues(
    makeCheckExpectedFacadeSms,
    dialogueSmsRepository,
    stepRepository,
    makeListPlanValuesFacade,
  );

  return new ListValuesMiddleware(dbListValues);
};

export const makeListValuesUra = () => {
  const dialogueUraRepository = new DialogueUraRepository();
  const stepRepository = new StepRepository();

  const dbListValues = new DbListValues(
    makeCheckExpectedFacadeUra,
    dialogueUraRepository,
    stepRepository,
    makeListPlanValuesFacade,
  );

  return new ListValuesMiddleware(dbListValues);
};
