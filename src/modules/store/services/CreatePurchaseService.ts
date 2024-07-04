import { injectable, inject } from 'tsyringe';
import StorePurchase from '../infra/typeorm/entities/StorePurchase';
import IStoreRepository from '../repositories/IStoreRepository';
import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';

@injectable()
class CreatePurchaseService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(data: ICreatePurchaseDTO): Promise<StorePurchase> {
    const purchase = await this.storeRepository.createPurchase(data);

    return purchase;
  }
}

export default CreatePurchaseService;
