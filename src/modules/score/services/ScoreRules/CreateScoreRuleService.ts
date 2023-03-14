import { injectable, inject } from 'tsyringe';

import ICreateScoreRuleDTO from '../../dtos/ICreateScoreRuleDTO';

import ScoreRule from '../../infra/typeorm/entities/ScoreRule';
import IScoreRepository from '../../repositories/IScoreRepository';

@injectable()
class CreateScoreRuleService {
  constructor(
    @inject('ScoreRepository')
    private scoreRepository: IScoreRepository,
  ) {}

  public async execute(data: ICreateScoreRuleDTO): Promise<ScoreRule> {
    const scoreRule = await this.scoreRepository.createScoreRule(data);

    return scoreRule;
  }
}

export default CreateScoreRuleService;
