import { injectable, inject } from 'tsyringe';
import IEditCategoryDTO from '../../dtos/Sports/IEditCategoryDTO';
import SportCategory from '../../infra/typeorm/entities/Sports/SportCategory';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class EditCategoryService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute(data: IEditCategoryDTO): Promise<SportCategory> {
    const category = await this.sportsRepository.editCategory(data);
    return category;
  }
}

export default EditCategoryService;
