import { injectable, inject } from 'tsyringe';
import Material from '../../infra/typeorm/entities/Materials/Material';
import IMaterialsRepository from '../../repositories/Materials/IMaterialsRepository';

@injectable()
class FindByIdService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(id: string): Promise<Material | undefined> {
    const material = await this.materialsRepository.findById(id);
    return material;
  }
}

export default FindByIdService;
