import { DefaultBody } from '../../../../domain/models';
import { MenuTypePayment } from '../../../../domain/usecases/core';
import { ListCards } from '../../../../domain/usecases/core/card/list-cards';
import { ExecuteRechargeByBillet } from '../../../../domain/usecases/core/recharge/execute-recharge-by-billet';
import { Step } from '../../../../utils/enum/step';
import { notFoundMessage } from '../../../../utils/message/default';
import {
  CreateDialogueRepository,
  ListStepWithSourceRepository,
  UpdateDialogueRepository,
} from '../../../protocols/core/db';

export class DbMenuTypePayment implements MenuTypePayment {
  constructor(
    private readonly updateDialogueRepository: UpdateDialogueRepository,
    private readonly createDialogueRepository: CreateDialogueRepository,
    private readonly listStepWithSourceRepository: ListStepWithSourceRepository,
    private readonly executeRechargeByBillet: ExecuteRechargeByBillet.Facade,
    private readonly listCards: ListCards.Facade,
  ) {}

  async check(params: DefaultBody): MenuTypePayment.Result {
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

    const nameStep = expecteis[params.message];
    const selectStep = +Step[nameStep];

    if (nameStep === 'PAYMENT_BILLET') {
      const step = await this.listStepWithSourceRepository.findStepAndSource({
        sourceId: params.sourceId,
        step: selectStep,
      });

      const finishStep =
        await this.listStepWithSourceRepository.findStepAndSource({
          sourceId: params.sourceId,
          step: Step.END,
        });

      const recharge = await this.executeRechargeByBillet({
        clientToken: props.session.token,
        msisdn: props.session.msisdn,
        planId: props.session.planId,
      });

      await this.createDialogueRepository.create({
        accountId: props.session.accountId,
        stepSourceId: finishStep.stepSourceId,
        requestDate: new Date(),
        requestText: step.message,
        session: JSON.stringify({
          ...props.session,
          ...recharge,
        }),
      });

      return {
        messages: [
          !recharge.status ? recharge.billet.message : step.message,
          finishStep.message,
        ],
        status: true,
        step,
        data: {
          ...props.session,
          ...recharge,
        },
      };
    }

    const { cards } = await this.listCards(props.session.token);

    const expect = {
      0: 'PAYMENT_TYPE_MENU',
      3: 'ADD_CARD',
    };

    const expectCard = cards.reduce(
      (acc, curr, index) => ({
        ...acc,
        [index + 1]: curr.paymentId,
      }),
      {},
    );

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
        ...expectCard,
        ...expect,
      }),
      session: JSON.stringify({
        ...props.session,
      }),
    });

    return {
      messages: [step.message],
      step,
      status: false,
      data: {
        ...props.session,
        cards,
      },
    };
  }
}
