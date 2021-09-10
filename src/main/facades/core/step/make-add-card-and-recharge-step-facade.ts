import { DbAddCardAndRechargeStep } from '../../../../data/usecases/core';
import { AddCardAndRechargeStep } from '../../../../domain/usecases/core';
import {
  DialogueSmsRepository,
  DialogueUraRepository,
  DialogueWhatsAppRepository,
  StepRepository,
} from '../../../../infra/core/db/mssql';
import { makeAddCardFacade } from '../card/make-add-card-facade';
import { makeExecuteRechargeByCreditCardFacade } from '../recharge/make-execute-recharge-by-credit-card-facade';

export const makeAddCardAndRechargeStepFacadeWhats: AddCardAndRechargeStep.Facade =
  (params) => {
    const dialogueWhatsAppRepository = new DialogueWhatsAppRepository();
    const stepRepository = new StepRepository();

    const dbAddCardAndRechargeStep = new DbAddCardAndRechargeStep(
      dialogueWhatsAppRepository,
      stepRepository,
      makeAddCardFacade,
      makeExecuteRechargeByCreditCardFacade,
    );

    return dbAddCardAndRechargeStep.add(params);
  };

export const makeAddCardAndRechargeStepFacadeSms: AddCardAndRechargeStep.Facade =
  (params) => {
    const dialogueSmsRepository = new DialogueSmsRepository();
    const stepRepository = new StepRepository();

    const dbAddCardAndRechargeStep = new DbAddCardAndRechargeStep(
      dialogueSmsRepository,
      stepRepository,
      makeAddCardFacade,
      makeExecuteRechargeByCreditCardFacade,
    );

    return dbAddCardAndRechargeStep.add(params);
  };
export const makeAddCardAndRechargeStepFacadeUra: AddCardAndRechargeStep.Facade =
  (params) => {
    const dialogueUraRepository = new DialogueUraRepository();
    const stepRepository = new StepRepository();

    const dbAddCardAndRechargeStep = new DbAddCardAndRechargeStep(
      dialogueUraRepository,
      stepRepository,
      makeAddCardFacade,
      makeExecuteRechargeByCreditCardFacade,
    );

    return dbAddCardAndRechargeStep.add(params);
  };
