import { DefaultBody } from '../../../../domain/models';
import { CheckExpected } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import { notFoundMessage } from '../../../../utils/message/default';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbCheckExpected implements CheckExpected {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async check(params: DefaultBody): CheckExpected.Result {
    const expecteis = params.dialogue.expected;
    const { dialogueId, ...props } = params.dialogue;

    await this.updateDialogueRepository.update(
      {
        responseDate: new Date(),
        responseText: params.message,
        updatedAt: new Date(),
      },
      dialogueId,
    );

    if (expecteis[params.message]) {
      return {
        isError: false,
        data: {
          status: false,
          messages: [params.stepSource.message],
          step: params.stepSource,
          data: { ...props.session, count: 0 },
        },
      };
    }

    const { createdAt, updatedAt, session, ...rest } = props;

    const sessionStep = {
      ...session,
      count: !session.count && session.count !== 0 ? 0 : session.count + 1,
    };

    if (sessionStep.count >= 4) {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.MAX_ERROR,
      });

      const finishStep =
        await this.listStepWithSourceRepository.findStepAndSource({
          sourceId: params.sourceId,
          step: Step.END,
        });

      await this.createDialogueRepository.create({
        ...rest,
        stepSourceId: finishStep.stepSourceId,
        requestText: step.message,
        expected: JSON.stringify(props.expected),
        session: JSON.stringify(sessionStep),
      });

      return {
        isError: true,
        data: {
          status: false,
          messages: [step.message, finishStep.message],
          step: params.stepSource,
          data: sessionStep,
        },
      };
    }

    await this.createDialogueRepository.create({
      ...rest,
      expected: JSON.stringify(props.expected),
      session: JSON.stringify(props.session),
    });

    return {
      isError: true,
      data: {
        status: false,
        messages: [notFoundMessage(params.sourceId), params.stepSource.message],
        step: params.stepSource,
        data: { ...props.session, count: 0 },
      },
    };
  }
}
