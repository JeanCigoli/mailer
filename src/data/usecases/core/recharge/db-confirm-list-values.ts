import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  ConfirmListValues,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import { Plan } from '../../../../domain/models';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbConfirmListValues implements ConfirmListValues {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async confirm(params: DefaultBody): ConfirmListValues.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    if (nameStep === 'TYPE_RECHARGE_MENU') {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: selectStep,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: JSON.stringify({
          0: 'RECHARGE_MENU',
          1: 'RECHARGE_PLAN',
          2: 'ADDON_PLAN',
        }),
        session: JSON.stringify({
          ...session,
          values: null,
        }),
      });

      return {
        messages: [step.message],
        step,
        status: false,
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.PAYMENT_TYPE_MENU,
    });

    const [plan] = session.values.filter(
      (value: Plan) => value.id === nameStep,
    );

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: JSON.stringify({
        1: 'VIEW_CARDS',
        2: 'PAYMENT_BILLET',
      }),
      session: JSON.stringify({
        ...session,
        planId: nameStep,
        values: plan,
      }),
    });

    return {
      status: false,
      messages: [step.message],
      step,
      data: {
        ...session,
        planId: nameStep,
        values: plan,
      },
    };
  }
}
