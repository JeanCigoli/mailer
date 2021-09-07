import { Authentication } from '../../../../domain/usecases/core';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListAccountByMsisdnRepository,
  ListAuthCodeRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly listAccountByMsisdnRepository: ListAccountByMsisdnRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listAuthCodeRepository: ListAuthCodeRepository,
  ) {}

  async auth(params: Authentication.Params): Authentication.Result {
    const account = await this.listAccountByMsisdnRepository.findByMsisdn({
      msisdn: params.msisdn,
    });

    if (!account) {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.START_ERROR,
      });

      return {
        messages: [step.message],
        status: false,
      };
    }

    await this.createDialogueRepository.create({
      accountId: account.accountId,
      stepSourceId: params.stepSource.stepSourceId,
      requestText: params.message,
      responseText: params.stepSource.message,
      requestDate: new Date(),
      responseDate: new Date(),
    });

    const code = await this.listAuthCodeRepository.findByAccount({
      accountId: account.accountId,
    });

    if (code) {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: Step.TOKEN_MENU,
      });

      await this.createDialogueRepository.create({
        accountId: account.accountId,
        stepSourceId: step.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        expected: JSON.stringify({
          1: 'VIEW_TOKEN',
          2: 'MAIN_MENU',
        }),
        session: JSON.stringify({
          ...account,
        }),
      });

      return {
        status: true,
        messages: [params.stepSource.message, step.message],
        data: account,
      };
    }

    const step = await this.listStepWithSourceRepository.findStepAndSource({
      sourceId: params.sourceId,
      step: Step.MAIN_MENU,
    });

    await this.createDialogueRepository.create({
      accountId: account.accountId,
      stepSourceId: step.stepSourceId,
      requestDate: new Date(),
      requestText: step.message,
      expected: JSON.stringify({
        1: 'RECHARGE_MENU',
        2: 'VIEW_CONSUMPTION',
        3: 'CARDS_MENU',
        9: 'TRANSFER_OPERATOR',
      }),
      session: JSON.stringify(account),
    });

    return {
      status: true,
      messages: [params.stepSource.message, step.message],
      data: account,
    };
  }
}
