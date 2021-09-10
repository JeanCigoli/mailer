import { DefaultBody } from '../../../../domain/models';
import {
  AddCardAndRechargeStep,
  AddCardStep,
  AddSecurityCode,
  SendRechargeStep,
} from '../../../../domain/usecases/core';
import { UpdateDialogueRepository } from '../../../protocols/core/db';

export class DbAddSecurityCode implements AddSecurityCode {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly addCardStep: AddCardStep.Facade,
    private readonly addCardAndRechargeStep: AddCardAndRechargeStep.Facade,
    private readonly sendRechargeStep: SendRechargeStep.Facade,
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

    if (!session.paymentId && session.planId) {
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
