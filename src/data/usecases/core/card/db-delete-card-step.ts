import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  DeleteCardStep,
} from '../../../../domain/usecases/core';
import { DeleteCard } from '../../../../domain/usecases/core/card/delete-card';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbDeleteCardStep implements DeleteCardStep {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly deleteCard: DeleteCard.Facade,
  ) {}

  async delete(params: DefaultBody): DeleteCardStep.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    if (nameStep === 'CARDS_MENU') {
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
          0: 'MAIN_MENU',
          1: 'ADD_CARD',
          2: 'VIEW_CARDS_DELETE',
        }),
        session: JSON.stringify({
          ...session,
          count: 0,
        }),
      });

      return {
        messages: [step.message],
        status: true,
        step,
        data: {
          ...session,
        },
      };
    }

    const card = await this.deleteCard({
      clientToken: session.token,
      paymentId: nameStep,
    });

    if (!card.status) {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.DELETE_CARD_ERROR,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: JSON.stringify({
          0: 'CARDS_MENU',
        }),
        session: JSON.stringify({
          ...session,
          count: 0,
        }),
      });

      return {
        messages: [step.message],
        status: true,
        step,
        data: {
          ...session,
          reason: card.message,
        },
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.DELETE_CARD_SUCCESS,
    });

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: JSON.stringify({
        0: 'MAIN_MENU',
        1: 'RECHARGE_MENU',
      }),
      session: JSON.stringify({
        ...session,
        cardId: nameStep,
        count: 0,
      }),
    });

    return {
      messages: [step.message],
      status: true,
      step,
      data: {
        ...session,
        cardId: nameStep,
        card: card.message,
      },
    };
  }
}
