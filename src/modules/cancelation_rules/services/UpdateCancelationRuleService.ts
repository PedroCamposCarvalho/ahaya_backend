import { injectable, inject } from 'tsyringe';
import CancelationRule from '../infra/typeorm/entities/CancelationRule';
import IUpdateCancelationRule from '../dtos/IUpdateCancelationRuleDTO';
import ICancelationRulesRepository from '../repositories/ICancelationRulesRepository';

@injectable()
class UpdateCancelationRuleService {
  constructor(
    @inject('CancelationRulesRepository')
    private cancelationRulesRepository: ICancelationRulesRepository,
  ) {}

  public async execute(data: IUpdateCancelationRule): Promise<CancelationRule> {
    const cancelationRule = await this.cancelationRulesRepository.update(data);

    return cancelationRule;
  }
}

export default UpdateCancelationRuleService;
