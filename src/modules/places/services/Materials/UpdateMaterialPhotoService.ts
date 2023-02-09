import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';
import Material from '../../infra/typeorm/entities/Materials/Material';
import AppError from '../../../../shared/errors/AppError';
import IMaterialsRepository from '../../repositories/Materials/IMaterialsRepository';

interface IRequest {
  material_id: string;
  logoFilename: string;
}

@injectable()
class UpdateMaterialPhotoService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    material_id,
    logoFilename,
  }: IRequest): Promise<Material> {
    const material = await this.materialsRepository.findById(material_id);
    if (!material) {
      throw new AppError('Only authenticated users can change the logo', 401);
    }
    if (material.photo) {
      await this.storageProvider.deleteFile(material.photo);
    }

    await this.storageProvider.saveFile(logoFilename);
    material.photo = logoFilename;
    await this.materialsRepository.save(material);
    return material;
  }
}

export default UpdateMaterialPhotoService;
