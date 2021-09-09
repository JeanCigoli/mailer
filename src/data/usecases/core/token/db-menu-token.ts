import { CheckExpected, MenuToken } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListAuthCodeRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbMenuToken implements MenuToken {
  constructor(
    private readonly listAuthCodeRepository: ListAuthCodeRepository,
    private readonly checkExpected: CheckExpected.Facade,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async check(params: MenuToken.Params): MenuToken.Result {
    const { expected, session } = params.dialogue;
    const checkStep = await this.checkExpected(params);

    if (checkStep.isError || !checkStep.data) {
      return checkStep.data;
    }

    const nameStep = expected[params.message];
    const selectStep = +Step[nameStep];

    if (expected[params.message] === 'MAIN_MENU') {
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
          1: 'RECHARGE_MENU',
          2: 'VIEW_CONSUMPTION',
          3: 'CARDS_MENU',
          9: 'TRANSFER_OPERATOR',
        }),
        session: JSON.stringify(session),
      });

      return {
        messages: [step.message],
        status: true,
        step,
        data: {},
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: selectStep,
    });

    const authCode = await this.listAuthCodeRepository.findByAccount({
      accountId: session.accountId,
    });

    await this.createDialogueRepository.create({
      accountId: session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      responseDate: new Date(),
      responseText: authCode.authCode,
      session: JSON.stringify({
        ...session,
        authCode: authCode.authCode,
      }),
    });

    const finishStep =
      await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.END,
      });

    await this.createDialogueRepository.create({
      accountId: session.accountId,
      stepSourceId: finishStep.stepSourceId,
      requestDate: new Date(),
      requestText: finishStep.message,
      session: JSON.stringify({
        ...session,
        authCode: authCode.authCode,
      }),
    });

    return {
      messages: [step.message, finishStep.message],
      status: true,
      step,
      data: {
        ...session,
        authCode: authCode.authCode,
      },
    };
  }
}
