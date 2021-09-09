import { DefaultBody } from '../../../../domain/models';
import { ConfirmListValues } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import { notFoundMessage } from '../../../../utils/message/default';
import { Plan } from '../../../../utils/types/plan-values/plan-values-type';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbConfirmListValues implements ConfirmListValues {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async confirm(params: DefaultBody): ConfirmListValues.Result {
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
        data: props.session,
      };
    }

    const selectStep = +Step[expecteis[params.message]];
    const nameStep = expecteis[params.message];

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
          ...props.session,
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

    const [plan] = props.session.values.filter(
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
        ...props.session,
        planId: nameStep,
        values: plan,
      }),
    });

    return {
      status: false,
      messages: [step.message],
      step,
      data: {
        ...props.session,
        planId: nameStep,
        values: plan,
      },
    };
  }
}
