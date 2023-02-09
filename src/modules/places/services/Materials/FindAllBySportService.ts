import { injectable, inject } from 'tsyringe';
import Material from '../../infra/typeorm/entities/Materials/Material';
import IMaterialsRepository from '../../repositories/Materials/IMaterialsRepository';

@injectable()
class FindAllBySportService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(id_sport: string): Promise<Material[]> {
    const materials = await this.materialsRepository.findAllBySport(id_sport);
    return materials;
  }
}

export default FindAllBySportService;
