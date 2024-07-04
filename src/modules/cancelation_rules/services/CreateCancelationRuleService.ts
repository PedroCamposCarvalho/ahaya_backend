import { injectable, inject } from 'tsyringe';
import CancelationRule from '../infra/typeorm/entities/CancelationRule';
import ICreateCancelationRule from '../dtos/ICreateCancelationRuleDTO';
import ICancelationRulesRepository from '../repositories/ICancelationRulesRepository';

@injectable()
class CreateCancelationRuleService {
  constructor(
    @inject('CancelationRulesRepository')
    private cancelationRulesRepository: ICancelationRulesRepository,
  ) {}

  public async execute(data: ICreateCancelationRule): Promise<CancelationRule> {
    const cancelationRule = await this.cancelationRulesRepository.create(data);

    return cancelationRule;
  }
}

export default CreateCancelationRuleService;
