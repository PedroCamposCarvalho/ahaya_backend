import { injectable, inject } from 'tsyringe';

import ICreateUserHistoryScoreDTO from '../../dtos/ICreateUserHistoryScoreDTO';
import IScoreRepository from '../../repositories/IScoreRepository';
import UserHistoryScore from '../../infra/typeorm/entities/UserHistoryScore';

@injectable()
class CreateUserHistoryScoreService {
  constructor(
    @inject('ScoreRepository')
    private scoreRepository: IScoreRepository,
  ) {}

  public async execute(
    data: ICreateUserHistoryScoreDTO,
  ): Promise<UserHistoryScore> {
    const userHistoryScore = await this.scoreRepository.createUserHistory(data);

    return userHistoryScore;
  }
}

export default CreateUserHistoryScoreService;
