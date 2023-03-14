import { injectable, inject } from 'tsyringe';

import IUpdateUserPointsDT0 from '../../dtos/IUpdateUserPointsDT0';
import IScoreRepository from '../../repositories/IScoreRepository';

@injectable()
class UpdateUserPointsService {
  constructor(
    @inject('ScoreRepository')
    private scoreRepository: IScoreRepository,
  ) {}

  public async execute(data: IUpdateUserPointsDT0): Promise<boolean> {
    const points = await this.scoreRepository.updateUserPoints(data);

    return points;
  }
}

export default UpdateUserPointsService;
