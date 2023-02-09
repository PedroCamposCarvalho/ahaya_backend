import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoreRepository from '../repositories/IStoreRepository';

@injectable()
class FindByIdService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(id: string): Promise<Store> {
    const product = await this.storeRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}

export default FindByIdService;
