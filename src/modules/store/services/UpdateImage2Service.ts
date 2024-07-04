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
class UpdateImage2Service {
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
    if (product.image2) {
      await this.storageProvider.deleteFile(product.image2);
    }

    await this.storageProvider.saveFile(imageFilename);
    product.image2 = imageFilename;
    await this.storeRepository.save(product);
    return product;
  }
}

export default UpdateImage2Service;
