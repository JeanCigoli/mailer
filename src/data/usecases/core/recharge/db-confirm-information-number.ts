import { DefaultBody } from '../../../../domain/models';
import {
  CheckExpected,
  ConfirmInformationNumber,
  ValidateAccount,
} from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbConfirmInformationNumber implements ConfirmInformationNumber {
  constructor(
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly validateAccount: ValidateAccount.Facade,
  ) {}

  async check(params: DefaultBody): ConfirmInformationNumber.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    const menu: any = {
      RECHARGE_MENU: JSON.stringify({
        0: 'MAIN_MENU',
        1: 'TYPE_RECHARGE_MENU',
        2: 'ENTER_ANOTHER_NUMBER',
      }),
      ENTER_ANOTHER_NUMBER: null,
    };

    if (nameStep === 'TYPE_RECHARGE_MENU') {
      const valid = await this.validateAccount({
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
      expected: menu[nameStep],
      session: JSON.stringify(session),
    });

    return {
      messages: [step.message],
      step,
      status: false,
      data: session,
    };
  }
}
