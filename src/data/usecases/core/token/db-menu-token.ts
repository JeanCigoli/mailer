import { MenuToken } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
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

    if (!expecteis[params.message]) {
      await this.updateDialogueRepository.update(
        {
          responseDate: new Date(),
          responseText: params.message,
          updatedAt: new Date(),
        },
        dialogueId,
      );

      const { createdAt, updatedAt, ...rest } = props;

      await this.createDialogueRepository.create({
        ...rest,
        expected: JSON.stringify(props.expected),
        session: JSON.stringify(props.session),
      });

      return {
        messages: ['reposta-nao-encontrada.wav', params.stepSource.message],
        status: false,
        data: {},
      };
    }

    const selectStep = +Step[expecteis[params.message]];

    if (expecteis[params.message] === 'MAIN_MENU') {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: selectStep,
      });

      await this.updateDialogueRepository.update(
        {
          responseDate: new Date(),
          responseText: params.message,
          updatedAt: new Date(),
        },
        dialogueId,
      );

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
        data: {},
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: selectStep,
    });

    await this.updateDialogueRepository.update(
      {
        responseDate: new Date(),
        responseText: params.message,
        updatedAt: new Date(),
      },
      dialogueId,
    );

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
      data: {},
    };
  }
}
