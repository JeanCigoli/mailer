import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  ConfirmPayment,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import { Card } from '../../../../utils/types/card/card-type';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbConfirmPayment implements ConfirmPayment {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async confirm(params: DefaultBody): ConfirmPayment.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: selectStep,
    });

    const expect = {
      0: 'PAYMENT_TYPE_MENU',
      3: 'ADD_CARD',
    };

    const expectCard = session.cards.reduce(
      (acc: any, curr: Card, index: number) => ({
        ...acc,
        [index + 1]: curr.paymentId,
      }),
      {},
    );

    const expeteis: any = {
      ADD_CVV: null,
      VIEW_CARDS: JSON.stringify({
        ...expectCard,
        ...expect,
      }),
    };

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: expeteis[nameStep],
      session: JSON.stringify({
        ...session,
      }),
    });

    return {
      messages: [step.message],
      step,
      status: false,
      data: {
        ...session,
      },
    };
  }
}
