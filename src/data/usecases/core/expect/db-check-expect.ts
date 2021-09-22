import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  SendMaximumAttempts,
} from '../../../../domain/usecases/core';
import { notFoundMessage } from '../../../../utils/message/default';
import {
  CreateDialogueRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbCheckExpected implements CheckExpected {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly sendMaximumAttempts: SendMaximumAttempts.Facade,
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
          status: true,
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
      const data = await this.sendMaximumAttempts({
        ...params,
        dialogue: {
          ...params.dialogue,
          session: sessionStep,
        },
      });

      return {
        isError: true,
        data,
      };
    }

    await this.createDialogueRepository.create({
      ...rest,
      expected: JSON.stringify(props.expected),
      session: JSON.stringify(sessionStep),
    });

    return {
      isError: true,
      data: {
        status: true,
        messages: [notFoundMessage(params.sourceId), params.stepSource.message],
        step: params.stepSource,
        data: sessionStep,
      },
    };
  }
}
