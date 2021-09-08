import { subMinutes } from 'date-fns';
import { VerifyStep } from '../../../domain/usecases/dialogue';
import { Step } from '../../../utils/enum/step';
import {
  ListDialogueByMsisdnRepository,
  listStepSourceByIdRepository,
  ListStepSourceByStepRepository,
} from '../../protocols/core/db';

export class DbVerifyStep implements VerifyStep {
  constructor(
    private readonly listDialogueByMsisdnRepository: ListDialogueByMsisdnRepository,
    private readonly listStepSourceByIdRepository: listStepSourceByIdRepository,
    private readonly listStepSourceByStepRepository: ListStepSourceByStepRepository,
  ) {}

  async step(params: VerifyStep.Params): VerifyStep.Result {
    const dateFinal = new Date().toISOString();
    const dateInit = subMinutes(new Date(), 15).toISOString();

    const dialogue = await this.listDialogueByMsisdnRepository.findByMsisdn({
      msisdn: params.msisdn,
      dateInit,
      dateFinal,
    });

    if (!dialogue) {
      const stepSource = await this.listStepSourceByStepRepository.findByStep({
        sourceId: params.sourceId,
        stepId: 1,
      });

      return {
        stepSource,
      };
    }

    const stepSource = await this.listStepSourceByIdRepository.findById({
      id: dialogue.stepSourceId,
    });

    if (stepSource.stepId === Step.END) {
      const stepSource = await this.listStepSourceByStepRepository.findByStep({
        sourceId: params.sourceId,
        stepId: 1,
      });

      return {
        stepSource,
      };
    }

    return {
      dialogue: {
        ...dialogue,
        session: dialogue.session
          ? JSON.parse(dialogue.session)
          : dialogue.session,
        expected: dialogue.expected
          ? JSON.parse(dialogue.expected)
          : dialogue.expected,
      },
      stepSource,
    };
  }
}
