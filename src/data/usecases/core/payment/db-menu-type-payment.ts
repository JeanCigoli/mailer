import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  MenuTypePayment,
} from '../../../../domain/usecases/core';
import { ListCards } from '../../../../domain/usecases/core/card/list-cards';
import { ExecuteRechargeByBillet } from '../../../../domain/usecases/core/recharge/execute-recharge-by-billet';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbMenuTypePayment implements MenuTypePayment {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly executeRechargeByBillet: ExecuteRechargeByBillet.Facade,
    private readonly listCards: ListCards.Facade,
  ) {}

  async check(params: DefaultBody): MenuTypePayment.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    if (nameStep === 'PAYMENT_BILLET') {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: selectStep,
      });

      const finishStep =
        await this.listStepWithSourceRepository.findStepAndSource({
          sourceId: params.sourceId,
          step: Step.END,
        });

      const recharge = await this.executeRechargeByBillet({
        clientToken: session.token,
        msisdn: session.msisdn,
        planId: session.planId,
      });

      await this.createDialogueRepository.create({
        accountId: session.accountId,
        stepSourceId: finishStep.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        session: JSON.stringify({
          ...session,
          ...recharge,
        }),
      });

      return {
        messages: [
          !recharge.status ? recharge.billet.message : step.message,
          finishStep.message,
        ],
        status: recharge.status,
        step,
        data: {
          ...session,
          ...recharge,
        },
      };
    }

    const result = await this.listCards(session.token);

    const cards = result.cards.slice(0, 2);

    const expect = {
      0: 'PAYMENT_TYPE_MENU',
      3: 'ADD_CARD',
    };

    const expectCard = cards.reduce(
      (acc, curr, index) => ({
        ...acc,
        [index + 1]: curr.paymentId,
      }),
      {},
    );

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: selectStep,
    });

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: JSON.stringify({
        ...expectCard,
        ...expect,
      }),
      session: JSON.stringify({
        ...session,
        cards,
      }),
    });

    return {
      messages: [step.message],
      step,
      status: false,
      data: {
        ...session,
        cards,
      },
    };
  }
}
