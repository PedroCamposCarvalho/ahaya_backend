import { injectable, inject } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoreRepository from '../repositories/IStoreRepository';
import IUpdateStoreDTO from '../dtos/IUpdateStoreDTO';

@injectable()
class UpdateProductService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(data: IUpdateStoreDTO): Promise<Store> {
    const product = await this.storeRepository.updateProduct(data);

    return product;
  }
}

export default UpdateProductService;
