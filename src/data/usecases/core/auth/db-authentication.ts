import { Authentication } from '../../../../domain/usecases/core';
import { GetToken } from '../../../../domain/usecases/core/token/get-token';
import { Step } from '../../../../utils/enum/step';
import {
  CreateDialogueRepository,
  ListAccountByMsisdnRepository,
  ListAuthCodeRepository,
  ListSourceMvnoRepository,
  ListStepWithSourceRepository,
} from '../../../protocols/core/db';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly listAccountByMsisdnRepository: ListAccountByMsisdnRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listAuthCodeRepository: ListAuthCodeRepository,
    private readonly listSourceMvnoRepository: ListSourceMvnoRepository,
    private readonly listToken: GetToken.Facade,
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
      1;

      return {
        messages: [step.message],
        step,
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

    const mvno = await this.listSourceMvnoRepository.findBySource({
      mvnoId: account.mvnoId,
      sourceId: params.sourceId,
    });

    const { token } = await this.listToken({
      msisdn: account.msisdn,
      authentication: mvno.authentication,
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
          token,
        }),
      });

      return {
        status: true,
        messages: [params.stepSource.message, step.message],
        step,
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
      session: JSON.stringify({
        ...account,
        token,
      }),
    });

    return {
      status: true,
      messages: [params.stepSource.message, step.message],
      step,
      data: account,
    };
  }
}
