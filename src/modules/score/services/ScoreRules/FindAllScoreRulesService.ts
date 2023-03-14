import IReturnFindAllScoreRulesDTO from '@modules/score/dtos/IReturnFindAllScoreRulesDTO';
import { injectable, inject } from 'tsyringe';

import IScoreRepository from '../../repositories/IScoreRepository';

@injectable()
class FindAllScoreRulesService {
  constructor(
    @inject('ScoreRepository')
    private scoreRepository: IScoreRepository,
  ) {}

  public async execute(): Promise<IReturnFindAllScoreRulesDTO[]> {
    const scoreRules = await this.scoreRepository.findAllScoreRules();

    return scoreRules;
  }
}

export default FindAllScoreRulesService;
