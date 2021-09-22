import { DefaultBody } from '../../../../domain/models';
import {
  InformationNumber,
  SendMaximumAttempts,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListAccountByMsisdnAndMvnoRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';
import { ValidAndFormatMsisdn } from '../../../protocols/core/utils';

export class DbInformationNumber implements InformationNumber {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly listAccountByMsisdnAndMvnoRepository: ListAccountByMsisdnAndMvnoRepository,
    private readonly validAndFormatMsisdn: ValidAndFormatMsisdn,
    private readonly sendMaximumAttempts: SendMaximumAttempts.Facade,
  ) {}

  async check(params: DefaultBody): InformationNumber.Result {
    const { dialogueId, ...props } = params.dialogue;

    await this.updateDialogueRepository.update(
      {
        responseDate: new Date(),
        responseText: params.message,
        updatedAt: new Date(),
      },
      dialogueId,
    );

    const validMsisdn = this.validAndFormatMsisdn(params.message);

    const expected = {
      error: JSON.stringify({
        1: 'ENTER_ANOTHER_NUMBER',
        0: 'RECHARGE_MENU',
      }),
      success: JSON.stringify({
        1: 'TYPE_RECHARGE_MENU',
        2: 'ENTER_ANOTHER_NUMBER',
        0: 'RECHARGE_MENU',
      }),
    };

    if (!validMsisdn.status) {
      if (props.session.count >= 3) {
        const result = await this.sendMaximumAttempts(params);

        return result;
      }

      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.ERROR_ANOTHER_NUMBER,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: expected['error'],
        session: JSON.stringify({
          ...props.session,
          count: props.session.count + 1,
        }),
      });

      return {
        messages: [step.message],
        step,
        status: true,
        data: { ...props.session },
      };
    }

    const account =
      await this.listAccountByMsisdnAndMvnoRepository.findByMsisdnAndMvno({
        msisdn: validMsisdn.msisdn,
        mvnoId: props.session.mvnoId,
      });

    if (!account) {
      if (props.session.count >= 3) {
        const result = await this.sendMaximumAttempts(params);

        return result;
      }

      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.ERROR_ANOTHER_NUMBER,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: expected['error'],
        session: JSON.stringify({
          ...props.session,
          count: props.session.count + 1,
        }),
      });

      return {
        messages: [step.message],
        step,
        status: true,
        data: {
          ...props.session,
        },
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.VIEW_ANOTHER_NUMBER,
    });

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: expected['success'],
      session: JSON.stringify({
        ...props.session,
        count: 0,
        msisdn: account.msisdn,
      }),
    });

    return {
      messages: [step.message],
      step,
      status: true,
      data: {
        ...props.session,
        msisdn: account.msisdn,
      },
    };
  }
}
