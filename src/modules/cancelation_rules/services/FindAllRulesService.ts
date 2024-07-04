import { injectable, inject } from 'tsyringe';
import CancelationRule from '../infra/typeorm/entities/CancelationRule';
import ICancelationRulesRepository from '../repositories/ICancelationRulesRepository';

@injectable()
class FindAllRulesService {
  constructor(
    @inject('CancelationRulesRepository')
    private cancelationRulesRepository: ICancelationRulesRepository,
  ) {}

  public async execute(): Promise<CancelationRule[]> {
    const cancelationRules =
      await this.cancelationRulesRepository.findAllRules();

    return cancelationRules;
  }
}

export default FindAllRulesService;
