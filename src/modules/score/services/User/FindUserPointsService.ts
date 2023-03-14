import { injectable, inject } from 'tsyringe';

import IScoreRepository from '../../repositories/IScoreRepository';

@injectable()
class FindUserPointsService {
  constructor(
    @inject('ScoreRepository')
    private scoreRepository: IScoreRepository,
  ) {}

  public async execute(id_user: string): Promise<number> {
    const points = await this.scoreRepository.findUserPoints(id_user);

    return points;
  }
}

export default FindUserPointsService;
