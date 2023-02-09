import Store from '../infra/typeorm/entities/Store';
import StorePurchase from '../infra/typeorm/entities/StorePurchase';
import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import IUpdateStoreDTO from '../dtos/IUpdateStoreDTO';
import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';

export default interface IUserRepository {
  createProduct(data: ICreateStoreDTO): Promise<Store>;
  findAll(): Promise<Store[]>;
  findById(id: string): Promise<Store | undefined>;
  save(product: Store): Promise<void>;
  updateProduct(data: IUpdateStoreDTO): Promise<Store>;
  deleteProduct(id: string): Promise<void>;
  createPurchase(data: ICreatePurchaseDTO): Promise<StorePurchase>;
  findUserPurchases(id_user: string): Promise<StorePurchase[]>;
  findNonRetrievedPurchases(): Promise<StorePurchase[]>;
  findRetrievedPurchases(): Promise<StorePurchase[]>;
  updateRetrievedFlag(id: string): Promise<StorePurchase>;
}
