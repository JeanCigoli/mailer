import { DefaultBody } from '../../../../domain/models';
import {
  ListConsumptionStep,
  VerifyMainMenu,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import { notFoundMessage } from '../../../../utils/message/default';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbVerifyMainMenu implements VerifyMainMenu {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly listConsumptionStep: ListConsumptionStep.Facade,
  ) {}

  async check(params: DefaultBody): VerifyMainMenu.Result {
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
        step: params.stepSource,
        status: false,
        data: {},
      };
    }

    const selectStep = +Step[expecteis[params.message]];
    const nameStep = expecteis[params.message];

    if (['RECHARGE_MENU', 'CARDS_MENU'].includes(nameStep)) {
      const expected: any = {
        RECHARGE_MENU: JSON.stringify({
          0: 'MAIN_MENU',
          1: 'TYPE_RECHARGE_MENU',
          2: 'ENTER_ANOTHER_NUMBER',
        }),
        CARDS_MENU: JSON.stringify({
          0: 'MAIN_MENU',
          1: 'ADD_CARD',
          2: 'VIEW_CARDS_DELETE',
        }),
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
        status: true,
        step,
        data: {},
      };
    }

    if (expecteis[params.message] === 'TRANSFER_OPERATOR') {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: selectStep,
      });

      const finishStep =
        await this.listStepWithSourceRepository.findStepAndSource({
          sourceId: params.sourceId,
          step: Step.END,
        });

      await this.createDialogueRepository.create({
        accountId: props.session.accountId,
        stepSourceId: finishStep.stepSourceId,
        requestDate: new Date(),
        requestText: finishStep.message,
        session: JSON.stringify({
          ...props.session,
        }),
      });

      return {
        messages: [step.message],
        step,
        status: true,
        data: {},
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: selectStep,
    });

    const result = await this.listConsumptionStep({
      ...params,
      stepSource: step,
    });

    return result;
  }
}
