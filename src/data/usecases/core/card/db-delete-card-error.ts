import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  DeleteCardError,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbDeleteCardError implements DeleteCardError {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async check(params: DefaultBody): DeleteCardError.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

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
      expected: JSON.stringify({
        0: 'MAIN_MENU',
        1: 'ADD_CARD',
        2: 'VIEW_CARDS_DELETE',
      }),
      session: JSON.stringify(session),
    });

    return {
      messages: [step.message],
      status: true,
      step,
      data: {},
    };
  }
}
