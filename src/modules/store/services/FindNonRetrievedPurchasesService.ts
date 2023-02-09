import { injectable, inject } from 'tsyringe';
import StorePurchase from '../infra/typeorm/entities/StorePurchase';
import IStoreRepository from '../repositories/IStoreRepository';

@injectable()
class FindNonRetrievedPurchasesService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(): Promise<StorePurchase[]> {
    const purchases = await this.storeRepository.findNonRetrievedPurchases();

    return purchases;
  }
}

export default FindNonRetrievedPurchasesService;
