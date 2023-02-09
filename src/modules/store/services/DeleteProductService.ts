import { injectable, inject } from 'tsyringe';
import IStoreRepository from '../repositories/IStoreRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const product = await this.storeRepository.deleteProduct(id);

    return product;
  }
}

export default DeleteUserService;
