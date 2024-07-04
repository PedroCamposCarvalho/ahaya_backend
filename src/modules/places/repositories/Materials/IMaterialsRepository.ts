import Material from '../../infra/typeorm/entities/Materials/Material';
import ICreateMaterialDTO from '../../dtos/Materials/ICreateMaterialDTO';

export default interface IMaterialsRepository {
  create(data: ICreateMaterialDTO): Promise<Material>;
  save(material: Material): Promise<Material>;
  findAllBySport(id_sport: string): Promise<Material[]>;
  findById(id: string): Promise<Material | undefined>;
  findByAppointemnt(id_appointment: string): Promise<Material[]>;
  findAll(): Promise<Material[]>;
}
