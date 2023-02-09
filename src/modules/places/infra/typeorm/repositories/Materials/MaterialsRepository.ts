import { getRepository, Repository } from 'typeorm';

import IMaterialsRepository from '@modules/places/repositories/Materials/IMaterialsRepository';
import ICreateMaterialDTO from '@modules/places/dtos/Materials/ICreateMaterialDTO';

// import AppError from '@shared/errors/AppError';
import Material from '../../entities/Materials/Material';

class MaterialsRepository implements IMaterialsRepository {
  private ormRepository: Repository<Material>;

  constructor() {
    this.ormRepository = getRepository(Material);
  }

  public async create(materialData: ICreateMaterialDTO): Promise<Material> {
    const material = this.ormRepository.create(materialData);
    await this.ormRepository.save(material);
    return material;
  }

  public async findById(id: string): Promise<Material | undefined> {
    const material = await this.ormRepository.findOne(id);

    return material;
  }

  public async save(material: Material): Promise<Material> {
    return this.ormRepository.save(material);
  }

  public async findAllBySport(id_sport: string): Promise<Material[]> {
    const materials = await this.ormRepository.query(
      `select mat.id, mat.material, mat.price, 0 as amount from materials mat where mat.sport_id = '${id_sport}'`,
    );
    return materials;
  }

  public async findByAppointemnt(id_appointment: string): Promise<Material[]> {
    const materials = await this.ormRepository.query(
      `select apo.id, mat.material, apo.amount from materials mat inner join appointments_materials apo on mat.id = apo.id_material where apo.id_appointment = '${id_appointment}'`,
    );
    return materials;
  }

  public async findAll(): Promise<Material[]> {
    const materials = await this.ormRepository.query(
      'select mat.id, mat.material, mat.price, spo.name as sport_name from materials mat inner join sports spo on mat.sport_id = spo.id order by spo.name',
    );
    return materials;
  }
}
export default MaterialsRepository;
