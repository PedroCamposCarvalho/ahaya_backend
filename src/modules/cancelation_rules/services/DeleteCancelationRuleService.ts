import { injectable, inject } from 'tsyringe';
import CancelationRule from '../infra/typeorm/entities/CancelationRule';
import ICancelationRulesRepository from '../repositories/ICancelationRulesRepository';

@injectable()
class DeleteCancelationRuleService {
  constructor(
    @inject('CancelationRulesRepository')
    private cancelationRulesRepository: ICancelationRulesRepository,
  ) {}

  public async execute(id: string): Promise<CancelationRule> {
    const cancelationRules = await this.cancelationRulesRepository.delete(id);

    return cancelationRules;
  }
}

export default DeleteCancelationRuleService;
