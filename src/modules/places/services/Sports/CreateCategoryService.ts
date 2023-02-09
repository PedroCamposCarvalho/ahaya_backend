import { injectable, inject } from 'tsyringe';
import ICreateCategoryDTO from '../../dtos/Sports/ICreateCategoryDTO';
import SportCategory from '../../infra/typeorm/entities/Sports/SportCategory';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class CreateSportService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute(data: ICreateCategoryDTO): Promise<SportCategory> {
    const category = await this.sportsRepository.createCategory(data);
    return category;
  }
}

export default CreateSportService;
