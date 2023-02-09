import { injectable, inject } from 'tsyringe';
import StorePurchase from '../infra/typeorm/entities/StorePurchase';
import IStoreRepository from '../repositories/IStoreRepository';

@injectable()
class UpdateRetrievedFlagService {
  constructor(
    @inject('StoreRepository')
    private storeRepository: IStoreRepository,
  ) {}

  public async execute(id: string): Promise<StorePurchase> {
    const Purchase = await this.storeRepository.updateRetrievedFlag(id);

    return Purchase;
  }
}

export default UpdateRetrievedFlagService;
