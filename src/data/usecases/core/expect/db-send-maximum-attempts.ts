import { SendMaximumAttempts } from '../../../../domain/usecases/core/expect/send-maximum-attempts';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbSendMaximumAttempts implements SendMaximumAttempts {
  constructor(
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
  ) {}

  async send(params: SendMaximumAttempts.Params): SendMaximumAttempts.Result {
    const { dialogueId, session, ...props } = params.dialogue;
    const { createdAt, updatedAt, ...rest } = props;

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
      session: JSON.stringify(session),
    });

    return {
      status: false,
      messages: [step.message, finishStep.message],
      step: params.stepSource,
      data: session,
    };
  }
}
