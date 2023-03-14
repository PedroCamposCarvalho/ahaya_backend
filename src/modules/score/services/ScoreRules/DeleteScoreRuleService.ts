import { injectable, inject } from 'tsyringe';

import ScoreRule from '../../infra/typeorm/entities/ScoreRule';
import IScoreRepository from '../../repositories/IScoreRepository';

@injectable()
class DeleteScoreRuleService {
  constructor(
    @inject('ScoreRepository')
    private scoreRepository: IScoreRepository,
  ) {}

  public async execute(id: string): Promise<ScoreRule> {
    const scoreRule = await this.scoreRepository.deleteScoreRule(id);

    return scoreRule;
  }
}

export default DeleteScoreRuleService;
