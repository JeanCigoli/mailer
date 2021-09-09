import { DefaultBody } from '../../../../domain/models';
import { ResendInformationNumber } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import { notFoundMessage } from '../../../../utils/message/default';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbResendInformationNumber implements ResendInformationNumber {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async check(params: DefaultBody): ResendInformationNumber.Result {
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
        messages: [notFoundMessage(params.sourceId), params.stepSource.message],
        status: false,
        step: params.stepSource,
        data: {},
      };
    }

    const selectStep = +Step[expecteis[params.message]];
    const nameStep = expecteis[params.message];

    const expected: any = {
      RECHARGE_MENU: JSON.stringify({
        0: 'MAIN_MENU',
        1: 'TYPE_RECHARGE_MENU',
        2: 'ENTER_ANOTHER_NUMBER',
      }),
      ENTER_ANOTHER_NUMBER: null,
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
      expected: expected[nameStep],
      session: JSON.stringify(props.session),
    });

    return {
      messages: [step.message],
      step,
      status: false,
      data: props.session,
    };
  }
}
