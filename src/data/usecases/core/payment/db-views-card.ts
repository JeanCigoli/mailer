import { DefaultBody } from '../../../../domain/models';
import { CheckExpected, ViewsCards } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import { Card } from '../../../../domain/models';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbViewsCards implements ViewsCards {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async check(params: DefaultBody): ViewsCards.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    if (['PAYMENT_TYPE_MENU', 'ADD_CARD'].includes(nameStep)) {
      const expecteis: any = {
        PAYMENT_TYPE_MENU: JSON.stringify({
          1: 'VIEW_CARDS',
          2: 'PAYMENT_BILLET',
        }),
        ADD_CARD: null,
      };

      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: selectStep,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: expecteis[nameStep],
        session: JSON.stringify(session),
      });

      return {
        messages: [step.message],
        status: true,
        step,
        data: { ...session },
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.CONFIRM_PAYMENT,
    });

    const [card] = session.cards.filter(
      (value: Card) => value.paymentId === nameStep,
    );

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: JSON.stringify({
        1: 'ADD_CVV',
        0: 'VIEW_CARDS',
      }),
      session: JSON.stringify({
        ...session,
        paymentId: nameStep,
        cards: card,
      }),
    });

    return {
      status: false,
      messages: [step.message],
      step,
      data: {
        ...session,
        paymentId: nameStep,
        cards: card,
      },
    };
  }
}
