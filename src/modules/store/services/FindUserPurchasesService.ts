import { injectable, inject } from 'tsyringe';
import StorePurchase from '../infra/typeorm/entities/StorePurchase';
import IStoreRepository from '../repositories/IStoreRepository';

@injectable()
class FindUserPurchasesService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(id_user: string): Promise<StorePurchase[]> {
    const purchases = await this.storeRepository.findUserPurchases(id_user);

    return purchases;
  }
}

export default FindUserPurchasesService;
