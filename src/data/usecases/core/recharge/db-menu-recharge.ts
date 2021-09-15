import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  MenuRecharge,
  ValidateAccount,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbRechargeMenu implements MenuRecharge {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly validateAccount: ValidateAccount.Facade,
  ) {}

  async check(params: DefaultBody): MenuRecharge.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    const expecteis: any = {
      MAIN_MENU: JSON.stringify({
        1: 'RECHARGE_MENU',
        2: 'VIEW_CONSUMPTION',
        3: 'CARDS_MENU',
        9: 'TRANSFER_OPERATOR',
      }),

      ENTER_ANOTHER_NUMBER: null,
    };

    if (nameStep === 'TYPE_RECHARGE_MENU') {
      const valid = await this.validateAccount({
        token: session.token,
        msisdn: session.msisdn,
        authentication: session.authentication,
      });

      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: selectStep,
      });

      await this.createDialogueRepository.create({
        accountId: params.dialogue.session.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: valid.expected,
        session: JSON.stringify({
          ...session,
          count: 0,
          canRechargeSingle: valid.canRechargeSingle,
        }),
      });

      return {
        messages: [step.message],
        status: true,
        step,
        data: {
          ...session,
          canRechargeSingle: valid.canRechargeSingle,
        },
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: selectStep,
    });

    await this.createDialogueRepository.create({
      accountId: params.dialogue.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: expecteis[nameStep],
      session: JSON.stringify({
        ...session,
        count: 0,
      }),
    });

    return {
      messages: [step.message],
      status: true,
      step,
      data: {
        ...session,
      },
    };
  }
}
