import { MenuToken } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import { notFoundMessage } from '../../../../utils/message/default';
import {
  CreateDialogueRepository,
  ListAuthCodeRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbMenuToken implements MenuToken {
  constructor(
    private readonly listAuthCodeRepository: ListAuthCodeRepository,
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
  ) {}

  async check(params: MenuToken.Params): MenuToken.Result {
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
        data: {},
      };
    }

    const selectStep = +Step[expecteis[params.message]];

    if (expecteis[params.message] === 'MAIN_MENU') {
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
        session: JSON.stringify(props.session),
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
      accountId: props.session.accountId,
    });

    await this.createDialogueRepository.create({
      accountId: props.session.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      responseDate: new Date(),
      responseText: authCode.authCode,
      session: JSON.stringify({
        ...props.session,
        authCode: authCode.authCode,
      }),
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
        authCode: authCode.authCode,
      }),
    });

    return {
      messages: [step.message, finishStep.message],
      status: true,
      step,
      data: {
        ...props.session,
        authCode: authCode.authCode,
      },
    };
  }
}
