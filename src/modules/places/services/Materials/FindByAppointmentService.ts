import { injectable, inject } from 'tsyringe';
import Material from '../../infra/typeorm/entities/Materials/Material';
import IMaterialsRepository from '../../repositories/Materials/IMaterialsRepository';

@injectable()
class FindByIdService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute(id_appointemnt: string): Promise<Material[]> {
    const materials = await this.materialsRepository.findByAppointemnt(
      id_appointemnt,
    );
    return materials;
  }
}

export default FindByIdService;
