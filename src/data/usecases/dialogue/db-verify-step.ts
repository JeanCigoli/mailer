import { VerifyStep } from '../../../domain/usecases/dialogue';
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
    const dialogue = await this.listDialogueByMsisdnRepository.findByMsisdn({
      msisdn: params.msisdn,
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

    return {
      dialogue,
      stepSource,
    };
  }
}