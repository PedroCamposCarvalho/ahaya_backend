import { injectable, inject } from 'tsyringe';

import IUpdateScoreRuleDTO from '../../dtos/IUpdateScoreRuleDTO';

import ScoreRule from '../../infra/typeorm/entities/ScoreRule';
import IScoreRepository from '../../repositories/IScoreRepository';

@injectable()
class UpdateScoreRuleService {
  constructor(
    @inject('ScoreRepository')
    private scoreRepository: IScoreRepository,
  ) {}

  public async execute(data: IUpdateScoreRuleDTO): Promise<ScoreRule> {
    const scoreRule = await this.scoreRepository.updateScoreRule(data);

    return scoreRule;
  }
}

export default UpdateScoreRuleService;
