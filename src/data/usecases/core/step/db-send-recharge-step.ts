import { DefaultBody } from '../../../../domain/models';
import { SendRechargeStep } from '../../../../domain/usecases/core';
import { ExecuteRechargeByCreditCard } from '../../../../domain/usecases/core/recharge/execute-recharge-by-credit-card';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbSendRechargeStep implements SendRechargeStep {
  constructor(
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly executeRechargeByCreditCard: ExecuteRechargeByCreditCard.Facade,
  ) {}

  async send(params: DefaultBody): SendRechargeStep.Result {
    const { session } = params.dialogue;

    const recharge = await this.executeRechargeByCreditCard({
      clientToken: session.token,
      cvv: params.message,
      msisdn: session.msisdn,
      paymentId: session.paymentId,
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
          ...recharge,
          count: 0,
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
        ...recharge,
        count: 0,
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
