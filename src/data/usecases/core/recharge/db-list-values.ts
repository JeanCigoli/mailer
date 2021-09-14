import { DefaultBody } from '../../../../domain/models';
import { CheckExpected, ListValues } from '../../../../domain/usecases/core';
import { ListPlanValues } from '../../../../domain/usecases/core/plan-values/list-plan-values';
import { RechargeType } from '../../../../utils/enum/recharge-type';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbListValues implements ListValues {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly listPlanValues: ListPlanValues.Facade,
  ) {}

  async list(params: DefaultBody): ListValues.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    if (nameStep === 'RECHARGE_MENU') {
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
          0: 'MAIN_MENU',
          1: 'TYPE_RECHARGE_MENU',
          2: 'ENTER_ANOTHER_NUMBER',
        }),
        session: JSON.stringify(session),
      });

      return {
        messages: [step.message],
        step,
        status: false,
        data: session,
      };
    }

    const typePlan =
      nameStep === 'RECHARGE_PLAN' ? RechargeType.SINGLE : RechargeType.ADDON;

    const { planValues: values } = await this.listPlanValues({
      clientToken: session.token,
      type: typePlan,
    });

    const expecteis = values.reduce(
      (acc, current, index) => ({
        ...acc,
        [index + 1]: current.id,
      }),
      {},
    );

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.VIEW_PLAN,
    });

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: JSON.stringify({
        ...expecteis,
        0: 'TYPE_RECHARGE_MENU',
      }),
      session: JSON.stringify({
        ...session,
        type: nameStep,
        values,
      }),
    });

    return {
      messages: [step.message],
      step,
      status: false,
      data: {
        ...session,
        type: nameStep,
        values,
      },
    };
  }
}
