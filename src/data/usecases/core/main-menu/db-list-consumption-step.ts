import { DefaultBody } from '../../../../domain/models';
import {
  ListConsumption,
  ListConsumptionStep,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbListConsumptionStep implements ListConsumptionStep {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly listConsumptions: ListConsumption.Facade,
  ) {}

  async list(params: DefaultBody): ListConsumptionStep.Result {
    const { dialogueId, ...props } = params.dialogue;

    await this.updateDialogueRepository.update(
      {
        responseDate: new Date(),
        responseText: params.message,
        updatedAt: new Date(),
      },
      dialogueId,
    );

    const consumption = await this.listConsumptions({
      msisdn: params.msisdn,
      token: props.session.token,
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
      }),
    });

    return {
      messages: [params.stepSource.message, finishStep.message],
      status: true,
      data: {
        ...props.session,
        ...consumption,
      },
    };
  }
}
