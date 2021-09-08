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

    const token =
      'eN3bb5bLvWoAq/epcAEFXQ7DlpD+ubooEYpCL/bulqEvrHcJjUCODvuteAzEFs7QHhqez78GwWsrPXD/JQFBEWEdWOf8duAzOtu+qITeZbWNUAk6MQ+E0PjoKmvUD4M9Yml2+8aUhyXOqrnvqNjO9yxn/C7KdK7dfJfvuMQLIFy0XoOG33z9Su2Bj9pdXRniYbWds7r41PNXk91qCZ4/xsHyz2Yh47NO6PoSu/GK++jXzW/V5aq2lSfzF1xbWVaBh/tOkWxDDCPUOjHXT8yYW21sCQrJcYWo/eBr/UZs94RxFBKeeBCFfULWzSG62WlwcC5eRJ9pIEpt2gqnhJG0s6n2kIV8r3lwMy4XlrHH/XiYowyJpW/mz/4idwTJDp0i8PsSuQ4pil9qD5n23ttMOLFljs0z9sjYK9fklObIvw8=';

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
