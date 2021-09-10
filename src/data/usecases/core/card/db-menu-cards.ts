import { DefaultBody } from '../../../../domain/models';
import { CheckExpected, MenuCards } from '../../../../domain/usecases/core';
import { ListCards } from '../../../../domain/usecases/core/card/list-cards';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbMenuCards implements MenuCards {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly listCards: ListCards.Facade,
  ) {}

  async check(params: DefaultBody): MenuCards.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    if (['MAIN_MENU', 'ADD_CARD'].includes(nameStep)) {
      const expecteis: any = {
        MAIN_MENU: JSON.stringify({
          1: 'RECHARGE_MENU',
          2: 'VIEW_CONSUMPTION',
          3: 'CARDS_MENU',
          9: 'TRANSFER_OPERATOR',
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

    const { cards } = await this.listCards(session.token);

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
        0: 'CARDS_MENU',
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
