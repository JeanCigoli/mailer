import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  ConfirmPayment,
} from '../../../../domain/usecases/core';
import { ListCards } from '../../../../domain/usecases/core/card/list-cards';
import { Step } from '../../../../utils/enum/step';
import { Card } from '../../../../domain/models';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbConfirmPayment implements ConfirmPayment {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly listCards: ListCards.Facade,
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

    if (nameStep === 'VIEW_CARDS') {
      const result = await this.listCards(session.token);

      const cards = result.cards.slice(0, 2);

      const expectCard = cards.reduce(
        (acc: any, curr: Card, index: number) => ({
          ...acc,
          [index + 1]: curr.paymentId,
        }),
        {},
      );

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: JSON.stringify({
          ...expectCard,
          0: 'PAYMENT_TYPE_MENU',
          3: 'ADD_CARD',
        }),
        session: JSON.stringify({
          ...session,
          count: 0,
          paymentId: null,
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

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: null,
      session: JSON.stringify({
        ...session,
        count: 0,
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
