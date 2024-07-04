import { injectable, inject } from 'tsyringe';
import SportCategory from '../../infra/typeorm/entities/Sports/SportCategory';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class FindCategoryBySportService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute(id_sport: string): Promise<SportCategory[]> {
    const categories = this.sportsRepository.findCategoriesBySport(id_sport);
    return categories;
  }
}

export default FindCategoryBySportService;
