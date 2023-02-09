import { injectable, inject } from 'tsyringe';
import Material from '../../infra/typeorm/entities/Materials/Material';
import IMaterialsRepository from '../../repositories/Materials/IMaterialsRepository';

@injectable()
class FindAllService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(): Promise<Material[]> {
    const materials = await this.materialsRepository.findAll();
    return materials;
  }
}

export default FindAllService;
