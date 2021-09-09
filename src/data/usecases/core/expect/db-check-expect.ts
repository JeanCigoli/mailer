import { DefaultBody } from '../../../../domain/models';
import { CheckExpected } from '../../../../domain/usecases/core';
import { notFoundMessage } from '../../../../utils/message/default';
import {
  CreateDialogueRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbCheckExpected implements CheckExpected {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
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

    if (!expecteis[params.message]) {
      const { createdAt, updatedAt, ...rest } = props;

      await this.createDialogueRepository.create({
        ...rest,
        expected: JSON.stringify(props.expected),
        session: JSON.stringify(props.session),
      });

      return {
        isError: true,
        data: {
          status: false,
          messages: [
            notFoundMessage(params.sourceId),
            params.stepSource.message,
          ],
          step: params.stepSource,
          data: {},
        },
      };
    }

    return {
      isError: false,
      data: {
        status: false,
        messages: [params.stepSource.message],
        step: params.stepSource,
      },
    };
  }
}
