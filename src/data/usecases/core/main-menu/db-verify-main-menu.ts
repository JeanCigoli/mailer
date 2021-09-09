import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
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
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly listConsumptionStep: ListConsumptionStep.Facade,
  ) {}

  async check(params: DefaultBody): VerifyMainMenu.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

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
        session: JSON.stringify(session),
      });

      return {
        messages: [step.message],
        status: true,
        step,
        data: {},
      };
    }

    if (expected[params.message] === 'TRANSFER_OPERATOR') {
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
        accountId: session.accountId,
        stepSourceId: finishStep.stepSourceId,
        requestDate: new Date(),
        requestText: finishStep.message,
        session: JSON.stringify({
          ...session,
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
