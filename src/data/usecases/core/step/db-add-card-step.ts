import { DefaultBody } from '../../../../domain/models';
import { AddCardStep } from '../../../../domain/usecases/core';
import { AddCard } from '../../../../domain/usecases/core/card/add-card';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbAddCardStep implements AddCardStep {
  constructor(
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly addCard: AddCard.Facade,
  ) {}

  async add(params: DefaultBody): AddCardStep.Result {
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
      return {
        messages: [params.stepSource.message],
        status: false,
        step: params.stepSource,
        data: {
          ...session,
        },
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.ADD_CARD_SUCCESS,
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
      }),
    });

    return {
      messages: [step.message, finishStep.message],
      status: true,
      step,
      data: {
        ...session,
        ...card,
      },
    };
  }
}
