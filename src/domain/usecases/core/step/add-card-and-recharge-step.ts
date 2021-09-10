import { DefaultBody, DefaultResult } from '../../../models';

export interface AddCardAndRechargeStep {
  add(params: AddCardAndRechargeStep.Params): AddCardAndRechargeStep.Result;
}

export namespace AddCardAndRechargeStep {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;

  export type Facade = (
    params: AddCardAndRechargeStep.Params,
  ) => AddCardAndRechargeStep.Result;
}
