import { injectable, inject } from 'tsyringe';
import ClubRules from '../infra/typeorm/entities/ClubRules';
import IClubRepository from '../repositories/IClubRepository';

@injectable()
class FindAllRulesService {
  constructor(
    @inject('ClubRepository')
    private clubRepository: IClubRepository,
  ) {}

  public async execute(): Promise<ClubRules[]> {
    const rules = await this.clubRepository.findAllRules();

    return rules;
  }
}

export default FindAllRulesService;
