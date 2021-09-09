import { DefaultBody } from '../../../../domain/models';
import { ListValues } from '../../../../domain/usecases/core';
import { ListPlanValues } from '../../../../domain/usecases/core/plan-values/list-plan-values';
import { Step } from '../../../../utils/enum/step';
import { notFoundMessage } from '../../../../utils/message/default';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbListValues implements ListValues {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly listPlanValues: ListPlanValues.Facade,
  ) {}

  async list(params: DefaultBody): ListValues.Result {
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
        session: JSON.stringify(props.session),
      });

      return {
        messages: [step.message],
        step,
        status: false,
        data: props.session,
      };
    }

    const typePlan =
      nameStep === 'RECHARGE_PLAN' ? 'RECARGA' : 'PACOTE ADICIONAL';

    const values = await this.listPlanValues({
      clientToken: props.session.token,
      type: typePlan,
    });

    const expected = values.planValues.reduce(
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
        ...expected,
        0: 'TYPE_RECHARGE_MENU',
      }),
      session: JSON.stringify({
        ...props.session,
        type: nameStep,
      }),
    });

    return {
      messages: [step.message],
      step,
      status: false,
      data: {
        ...props.session,
        type: nameStep,
        values,
      },
    };
  }
}
