import { injectable, inject } from 'tsyringe';
import Store from '../infra/typeorm/entities/Store';
import IStoreRepository from '../repositories/IStoreRepository';
import ICreateStoreDTO from '../dtos/ICreateStoreDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(data: ICreateStoreDTO): Promise<Store> {
    const product = await this.storeRepository.createProduct(data);

    return product;
  }
}

export default CreateUserService;
