import { injectable, inject } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoreRepository from '../repositories/IStoreRepository';

@injectable()
class FindAllProductsService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(): Promise<Store[]> {
    const product = await this.storeRepository.findAll();

    return product;
  }
}

export default FindAllProductsService;
