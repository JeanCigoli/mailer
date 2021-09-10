import { DefaultBody } from '../../../../domain/models';
import { AddNumberCard } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';
import { ValidCardNumber } from '../../../protocols/core/utils';

export class DbAddNumberCard implements AddNumberCard {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly validCardNumber: ValidCardNumber,
  ) {}

  async add(params: DefaultBody): AddNumberCard.Result {
    const { dialogueId, ...props } = params.dialogue;

    await this.updateDialogueRepository.update(
      {
        responseDate: new Date(),
        responseText: params.message,
        updatedAt: new Date(),
      },
      dialogueId,
    );

    if (!this.validCardNumber(params.message)) {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.ADD_CARD_ERROR,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: params.stepSource.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: null,
        session: JSON.stringify(props.session),
      });

      return {
        messages: [step.message, params.stepSource.message],
        step,
        status: false,
        data: {
          ...props.session,
        },
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.VALIDITY_CARD,
    });

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: null,
      session: JSON.stringify({
        ...props.session,
        newCard: {
          cardNumber: params.message,
          type: 'C',
        },
      }),
    });

    return {
      messages: [step.message],
      step,
      status: false,
      data: {
        ...props.session,
      },
    };
  }
}
