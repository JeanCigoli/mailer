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
      token:
        'eN3bb5bLvWoAq/epcAEFXQ7DlpD+ubooEYpCL/bulqEvrHcJjUCODvuteAzEFs7QHhqez78GwWsrPXD/JQFBEWEdWOf8duAzOtu+qITeZbWNUAk6MQ+E0PjoKmvUD4M9Yml2+8aUhyXOqrnvqNjO9yxn/C7KdK7dfJfvuMQLIFy0XoOG33z9Su2Bj9pdXRniYbWds7r41PNXk91qCZ4/xsHyz2Yh47NO6PoSu/GK++jXzW/V5aq2lSfzF1xbWVaBh/tOkWxDDCPUOjHXT8yYW21sCQrJcYWo/eBr/UZs94RxFBKeeBCFfULWzSG62WlwcC5eRJ9pIEpt2gqnhJG0s6n2kIV8r3lwMy4XlrHH/XiYowyJpW/mz/4idwTJDp0i8PsSuQ4pil9qD5n23ttMOLFljs0z9sjYK9fklObIvw8=',
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
