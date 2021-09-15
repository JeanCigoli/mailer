import { DefaultBody } from '../../../../domain/models';
import {
  AddValidityCard,
  SendMaximumAttempts,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';
import { ValidCardValidity } from '../../../protocols/core/utils';

export class DbAddValidityCard implements AddValidityCard {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly validCardValidity: ValidCardValidity,
    private readonly sendMaximumAttempts: SendMaximumAttempts.Facade,
  ) {}

  async add(params: DefaultBody): AddValidityCard.Result {
    const { dialogueId, session } = params.dialogue;

    await this.updateDialogueRepository.update(
      {
        responseDate: new Date(),
        responseText: params.message,
        updatedAt: new Date(),
      },
      dialogueId,
    );

    const validValidity = this.validCardValidity(params.message);

    if (!validValidity.status) {
      if (session.count >= 3) {
        const result = await this.sendMaximumAttempts(params);
        return result;
      }

      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.VALIDITY_CARD_ERROR,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: params.stepSource.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: null,
        session: JSON.stringify({
          ...session,
          count: session.count + 1,
        }),
      });

      return {
        messages: [step.message, params.stepSource.message],
        step,
        status: false,
        data: {
          ...session,
        },
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: session.planId ? Step.CONFIRM_PAYMENT : Step.CONFIRM_ADD_CARD,
    });

    const expecteis: any = {
      21: JSON.stringify({
        1: 'ADD_CVV',
        0: 'VIEW_CARDS',
      }),
      26: JSON.stringify({
        1: 'ADD_CVV',
        0: 'CARDS_MENU',
      }),
    };

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: expecteis[step.stepId],
      session: JSON.stringify({
        ...session,
        count: 0,
        newCard: {
          ...session.newCard,
          type: 'C',
          validity: validValidity.validity,
        },
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
