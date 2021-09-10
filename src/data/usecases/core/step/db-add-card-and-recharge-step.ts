import { DefaultBody } from '../../../../domain/models';
import { AddCardAndRechargeStep } from '../../../../domain/usecases/core';
import { AddCard } from '../../../../domain/usecases/core/card/add-card';
import { ExecuteRechargeByCreditCard } from '../../../../domain/usecases/core/recharge/execute-recharge-by-credit-card';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbAddCardAndRechargeStep implements AddCardAndRechargeStep {
  constructor(
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly addCard: AddCard.Facade,
    private readonly executeRechargeByCreditCard: ExecuteRechargeByCreditCard.Facade,
  ) {}

  async add(params: DefaultBody): AddCardAndRechargeStep.Result {
    const { session } = params.dialogue;

    const card = await this.addCard({
      cardNumber: session.newCard.cardNumber,
      type: session.newCard.type,
      validity: session.newCard.validity,
      clientToken: session.token,
      document: session.document,
      name: session.name,
      cvv: params.message,
    });

    if (!card.status) {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.RECHARGE_ERROR,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: JSON.stringify({
          1: 'PAYMENT_TYPE_MENU',
          0: 'MAIN_MENU',
        }),
        session: JSON.stringify({
          ...session,
          ...card,
        }),
      });

      return {
        messages: [step.message],
        status: false,
        step,
        data: {
          ...session,
          ...card,
        },
      };
    }

    const recharge = await this.executeRechargeByCreditCard({
      clientToken: session.token,
      cvv: params.message,
      msisdn: session.msisdn,
      paymentId: card.paymentId as string,
      planId: session.planId,
    });

    if (!recharge.status) {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.RECHARGE_ERROR,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: JSON.stringify({
          1: 'PAYMENT_TYPE_MENU',
          0: 'MAIN_MENU',
        }),
        session: JSON.stringify({
          ...session,
          ...card,
        }),
      });

      return {
        messages: [step.message],
        status: false,
        step,
        data: {
          ...session,
          ...recharge,
        },
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.RECHARGE_SUCCESS,
    });

    const finishStep =
      await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.END,
      });

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: finishStep.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: null,
      session: JSON.stringify({
        ...session,
        ...card,
        ...recharge,
      }),
    });

    return {
      messages: [step.message, finishStep.message],
      status: false,
      step,
      data: {
        ...session,
        ...recharge,
      },
    };
  }
}
