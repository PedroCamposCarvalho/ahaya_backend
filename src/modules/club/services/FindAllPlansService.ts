import { injectable, inject } from 'tsyringe';
import ClubPlans from '../infra/typeorm/entities/ClubPlans';
import IClubRepository from '../repositories/IClubRepository';

@injectable()
class FindAllPlansService {
  constructor(
    @inject('ClubRepository')
    private clubRepository: IClubRepository,
  ) {}

  public async execute(): Promise<ClubPlans[]> {
    const plans = await this.clubRepository.findAllPlans();

    return plans;
  }
}

export default FindAllPlansService;
