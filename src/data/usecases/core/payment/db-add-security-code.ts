import { DefaultBody } from '../../../../domain/models';
import {
  AddCardAndRechargeStep,
  AddCardStep,
  AddSecurityCode,
  SendMaximumAttempts,
  SendRechargeStep,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';
import { ValidSecurityCode } from '../../../protocols/core/utils';

export class DbAddSecurityCode implements AddSecurityCode {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly addCardStep: AddCardStep.Facade,
    private readonly addCardAndRechargeStep: AddCardAndRechargeStep.Facade,
    private readonly sendRechargeStep: SendRechargeStep.Facade,
    private readonly sendMaximumAttempts: SendMaximumAttempts.Facade,
    private readonly validSecurityCode: ValidSecurityCode,
  ) {}

  async add(params: DefaultBody): AddSecurityCode.Result {
    const { dialogueId, session } = params.dialogue;

    await this.updateDialogueRepository.update(
      {
        responseDate: new Date(),
        responseText: params.message,
        updatedAt: new Date(),
      },
      dialogueId,
    );

    const validCode = this.validSecurityCode(params.message);

    if (!validCode.status) {
      if (session.count >= 4) {
        const result = await this.sendMaximumAttempts(params);
        return result;
      }

      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.CVV_ERROR,
      });

      await this.createDialogueRepository.create({
        accountId: session.accountId,
        stepSourceId: params.stepSource.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: null,
        session: JSON.stringify({
          ...session,
          count: session.count + 1,
        }),
      });

      return {
        messages: [step.message, params.stepSource.message],
        step: params.stepSource,
        status: false,
        data: {
          ...session,
        },
      };
    }

    if (!session.paymentId && session.newCard && session.planId) {
      const result = await this.addCardAndRechargeStep(params);

      return result;
    }

    if (session.paymentId && session.planId) {
      const result = await this.sendRechargeStep(params);

      return result;
    }

    const result = await this.addCardStep(params);

    return result;
  }
}
