import { DefaultBody } from '../../../../domain/models';
import { MenuRecharge } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import { notFoundMessage } from '../../../../utils/message/default';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbRechargeMenu implements MenuRecharge {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async check(params: DefaultBody): MenuRecharge.Result {
    const expecteis = params.dialogue.expected;
    const { dialogueId, ...props } = params.dialogue;

    if (!expecteis[params.message]) {
      await this.updateDialogueRepository.update(
        {
          responseDate: new Date(),
          responseText: params.message,
          updatedAt: new Date(),
        },
        dialogueId,
      );

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
      MAIN_MENU: JSON.stringify({
        1: 'RECHARGE_MENU',
        2: 'VIEW_CONSUMPTION',
        3: 'CARDS_MENU',
        9: 'TRANSFER_OPERATOR',
      }),
      TYPE_RECHARGE_MENU: JSON.stringify({
        0: 'RECHARGE_MENU',
        1: 'RECHARGE_PLAN',
        2: 'ADDON_PLAN',
      }),
      ENTER_ANOTHER_NUMBER: {},
    };

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: selectStep,
    });

    await this.updateDialogueRepository.update(
      {
        responseDate: new Date(),
        responseText: params.message,
        updatedAt: new Date(),
      },
      dialogueId,
    );

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
      status: true,
      step,
      data: props.session,
    };
  }
}
