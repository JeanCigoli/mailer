import { DefaultBody } from '../../../../domain/models';
import {
  ListConsumption,
  ListConsumptionStep,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbListConsumptionStep implements ListConsumptionStep {
  constructor(
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly listConsumptions: ListConsumption.Facade,
  ) {}

  async list(params: DefaultBody): ListConsumptionStep.Result {
    const { dialogueId, ...props } = params.dialogue;

    const consumption = await this.listConsumptions({
      msisdn: params.msisdn,
      token: props.session.token,
    });

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.VIEW_CONSUMPTION,
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
        ...consumption,
        count: 0,
      }),
    });

    return {
      messages: [params.stepSource.message, finishStep.message],
      status: false,
      step,
      data: {
        ...props.session,
        ...consumption,
      },
    };
  }
}
