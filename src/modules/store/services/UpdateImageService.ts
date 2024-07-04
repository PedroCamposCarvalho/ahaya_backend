import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';
import Store from '../infra/typeorm/entities/Store';
import AppError from '../../../shared/errors/AppError';
import IStoreRepository from '../repositories/IStoreRepository';

interface IRequest {
  id: string;
  imageFilename: string;
}

@injectable()
class UpdateImageService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, imageFilename }: IRequest): Promise<Store> {
    const product = await this.storeRepository.findById(id);
    if (!product) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }
    if (product.image1) {
      await this.storageProvider.deleteFile(product.image1);
    }

    await this.storageProvider.saveFile(imageFilename);
    product.image1 = imageFilename;
    await this.storeRepository.save(product);
    return product;
  }
}

export default UpdateImageService;
