import { getRepository, Repository } from 'typeorm';

import IStoreRepository from '@modules/store/repositories/IStoreRepository';
import ICreateStoreDTO from '@modules/store/dtos/ICreateStoreDTO';
import IUpdateStoreDTO from '@modules/store/dtos/IUpdateStoreDTO';
import ICreatePurchaseDTO from '@modules/store/dtos/ICreatePurchaseDTO';
import AppError from '@shared/errors/AppError';

import Store from '../entities/Store';
import StorePurchase from '../entities/StorePurchase';

class StoreRepository implements IStoreRepository {
  private ormRepository: Repository<Store>;

  private purchaseRepository: Repository<StorePurchase>;

  constructor() {
    this.ormRepository = getRepository(Store);
    this.purchaseRepository = getRepository(StorePurchase);
  }

  public async createProduct(data: ICreateStoreDTO): Promise<Store> {
    const product = await this.ormRepository.create(data);
    await this.ormRepository.save(product);
    return product;
  }

  public async findAll(): Promise<Store[]> {
    const products = await this.ormRepository.find();
    return products;
  }

  public async findById(id: string): Promise<Store | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return product;
  }

  public async save(product: Store): Promise<void> {
    await this.ormRepository.save(product);
  }

  public async updateProduct(data: IUpdateStoreDTO): Promise<Store> {
    const product = await this.ormRepository.findOne({
      where: {
        id: data.id,
      },
    });
    if (!product) {
      throw new AppError('Product not found');
    }
    product.product = data.product;
    product.price = data.price;
    product.inventory = data.inventory;
    product.description = data.description;

    await this.ormRepository.save(product);

    return product;
  }

  public async deleteProduct(id: string): Promise<void> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    if (!product) {
      throw new AppError('Product not found');
    }
    await this.ormRepository.remove(product);
  }

  public async createPurchase(
    data: ICreatePurchaseDTO,
  ): Promise<StorePurchase> {
    const product = await this.ormRepository.findOne({
      where: {
        id: data.id_product,
      },
    });
    if (!product) {
      throw new AppError('Product not found');
    }

    product.inventory -= data.amount;
    await this.ormRepository.save(product);
    const purchase = await this.purchaseRepository.create(data);
    await this.purchaseRepository.save(purchase);
    return purchase;
  }

  public async findUserPurchases(id_user: string): Promise<StorePurchase[]> {
    const purchases = await this.purchaseRepository.query(
      `select pur.id, pro.product, pur.id_product, pur.amount, pur.price_paid, pur.retrieved from store_purchases pur inner join store pro on pur.id_product = pro.id where pur.id_user='${id_user}'`,
    );

    return purchases;
  }

  public async findNonRetrievedPurchases(): Promise<StorePurchase[]> {
    const purchases = await this.purchaseRepository.query(
      `select pur.id, pro.product, pur.id_product, pur.amount, pur.price_paid, pur.retrieved, use.name from store_purchases pur inner join store pro on pur.id_product = pro.id inner join users use on pur.id_user = use.id where pur.retrieved=false`,
    );
    return purchases;
  }

  public async findRetrievedPurchases(): Promise<StorePurchase[]> {
    const purchases = await this.purchaseRepository.query(
      `select pur.id, pro.product, pur.id_product, pur.amount, pur.price_paid, pur.retrieved, use.name from store_purchases pur inner join store pro on pur.id_product = pro.id inner join users use on pur.id_user = use.id where pur.retrieved=true`,
    );
    return purchases;
  }

  public async updateRetrievedFlag(id: string): Promise<StorePurchase> {
    const purchase = await this.purchaseRepository.findOne({
      where: {
        id,
      },
    });

    if (!purchase) {
      throw new AppError('Purchase not found');
    }

    purchase.retrieved = !purchase.retrieved;

    await this.purchaseRepository.save(purchase);

    return purchase;
  }
}
export default StoreRepository;
