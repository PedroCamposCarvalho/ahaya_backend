import { injectable, inject } from 'tsyringe';
import ICreateMaterialDTO from '../../dtos/Materials/ICreateMaterialDTO';
import Material from '../../infra/typeorm/entities/Materials/Material';
import IMaterialsRepository from '../../repositories/Materials/IMaterialsRepository';

@injectable()
class CreateMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute({
    material,
    sport_id,
  }: ICreateMaterialDTO): Promise<Material> {
    const sport = this.materialsRepository.create({
      material,
      sport_id,
    });

    return sport;
  }
}

export default CreateMaterialService;
