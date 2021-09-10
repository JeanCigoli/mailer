import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  DeleteCardSuccess,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbDeleteCardSuccess implements DeleteCardSuccess {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async check(params: DefaultBody): DeleteCardSuccess.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    const expecteis: any = {
      RECHARGE_MENU: JSON.stringify({
        0: 'MAIN_MENU',
        1: 'TYPE_RECHARGE_MENU',
        2: 'ENTER_ANOTHER_NUMBER',
      }),
      MAIN_MENU: JSON.stringify({
        1: 'RECHARGE_MENU',
        2: 'VIEW_CONSUMPTION',
        3: 'CARDS_MENU',
        9: 'TRANSFER_OPERATOR',
      }),
    };

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: selectStep,
    });

    delete session.cards;
    delete session.card;

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: expecteis[nameStep],
      session: JSON.stringify(session),
    });

    return {
      messages: [step.message],
      status: true,
      step,
      data: {
        ...session,
      },
    };
  }
}
