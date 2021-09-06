import {
  CreateDialogueRepository,
  ListDialogueByMsisdnRepository,
  UpdateDialogueRepository,
} from '../../../../data/protocols/core/db';
import { Dialogue } from '../../../../domain/models';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '../../../../utils/object';
import { dbPhoenix } from '../helpers';

export class DialogueWhatsAppRepository
  implements
    CreateDialogueRepository,
    UpdateDialogueRepository,
    ListDialogueByMsisdnRepository
{
  async create(
    params: CreateDialogueRepository.Params,
  ): CreateDialogueRepository.Result {
    const [result] = await dbPhoenix('[whatsapp].[tb_dialogue]')
      .insert(formateCamelCaseKeysForSnakeCase(params))
      .returning('*');

    return formateSnakeCaseKeysForCamelCase(result);
  }

  async update(
    params: Partial<Dialogue>,
    id: number,
  ): UpdateDialogueRepository.Result {
    const [result] = await dbPhoenix('[whatsapp].[tb_dialogue]')
      .update(formateCamelCaseKeysForSnakeCase(params))
      .where('dialogue_id', id)
      .returning('*');

    return formateSnakeCaseKeysForCamelCase(result);
  }

  async findByMsisdn(
    params: ListDialogueByMsisdnRepository.Params,
  ): ListDialogueByMsisdnRepository.Result {
    const result = await dbPhoenix('[client].[tb_account] as [account]')
      .innerJoin(
        '[whatsapp].[tb_dialogue] as [dialogue]',
        '[account].[account_id]',
        '[dialogue].[account_id]',
      )
      .select('[dialogue].*')
      .where('[account].[msisdn]', params.msisdn)
      .orderBy('[dialogue].[created_at]', 'desc')
      .first();

    return formateSnakeCaseKeysForCamelCase(result);
  }
}
