import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateProductService from '@modules/store/services/CreateProductService';
import FindAllProductsService from '@modules/store/services/FindAllProductsService';
import UpdateImageService from '@modules/store/services/UpdateImageService';
import UpdateImage2Service from '@modules/store/services/UpdateImage2Service';
import UpdateImage3Service from '@modules/store/services/UpdateImage3Service';
import FindByIdService from '@modules/store/services/FindByIdService';
import UpdateProductService from '@modules/store/services/UpdateProductService';
import DeleteProductService from '@modules/store/services/DeleteProductService';
import CreatePurchaseService from '@modules/store/services/CreatePurchaseService';
import FindUserPurchasesService from '@modules/store/services/FindUserPurchasesService';
import FindNonRetrievedPurchasesService from '@modules/store/services/FindNonRetrievedPurchasesService';
import FindRetrievedPurchasesService from '@modules/store/services/FindRetrievedPurchasesService';
import UpdateRetrievedFlagService from '@modules/store/services/UpdateRetrievedFlagService';
import FindUserByIdService from '@modules/users/services/FindByIdService';
import SpecificsNotification from '../../../providers/SpecificsNotification';
import CreateNotification from '../../../providers/GeneralNotification';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute(request.body);
    request.io.emit('productCreated');
    await CreateNotification('Novo produto na lojinha!', `${product.product}`);
    return response.json(classToClass(product));
  }

  public async findAllProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllProductsService = container.resolve(FindAllProductsService);
    const products = await findAllProductsService.execute();

    return response.json(classToClass(products));
  }

  public async updateImage1(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateImageService = container.resolve(UpdateImageService);
    const { id } = request.query;
    const product = await updateImageService.execute({
      id: String(id),
      imageFilename: request.file.filename,
    });

    return response.json(classToClass(product));
  }

  public async updateImage2(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateImage2Service = container.resolve(UpdateImage2Service);
    const { id } = request.query;
    const product = await updateImage2Service.execute({
      id: String(id),
      imageFilename: request.file.filename,
    });

    return response.json(classToClass(product));
  }

  public async updateImage3(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateImage3Service = container.resolve(UpdateImage3Service);
    const { id } = request.query;
    const product = await updateImage3Service.execute({
      id: String(id),
      imageFilename: request.file.filename,
    });

    return response.json(classToClass(product));
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findByIdService = container.resolve(FindByIdService);
    const product = await findByIdService.execute(
      String(request.query.id_product),
    );

    return response.json(classToClass(product));
  }

  public async updateProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute(request.body);

    return response.json(classToClass(product));
  }

  public async deleteProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute(String(request.query.id_product));

    return response.json({ ok: true });
  }

  public async createPurchase(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createPurchaseService = container.resolve(CreatePurchaseService);
    const findUserByIdService = container.resolve(FindUserByIdService);
    const findByIdService = container.resolve(FindByIdService);
    const purchase = await createPurchaseService.execute(request.body);
    const product = await findByIdService.execute(
      String(request.body.id_product),
    );
    const user = await findUserByIdService.execute(request.body.id_user);
    if (user) {
      await SpecificsNotification(
        [String(process.env.USER_ID_PEDRO)],
        `${product.product} vendido!`,
        `${user.name} comprou ${purchase.amount} itens!`,
      );
    }

    return response.json(purchase);
  }

  public async findUserPurchases(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUserPurchasesService = container.resolve(
      FindUserPurchasesService,
    );
    const purchases = await findUserPurchasesService.execute(
      String(request.query.id_user),
    );
    return response.json(purchases);
  }

  public async findNonRetrievedPurchases(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findNonRetrievedPurchasesService = container.resolve(
      FindNonRetrievedPurchasesService,
    );

    const purchases = await findNonRetrievedPurchasesService.execute();

    return response.json(purchases);
  }

  public async findRetrievedPurchases(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findRetrievedPurchasesService = container.resolve(
      FindRetrievedPurchasesService,
    );

    const purchases = await findRetrievedPurchasesService.execute();

    return response.json(purchases);
  }

  public async updateRetrievedFlag(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateRetrievedFlagService = container.resolve(
      UpdateRetrievedFlagService,
    );

    const purchase = await updateRetrievedFlagService.execute(
      String(request.query.id),
    );

    return response.json(purchase);
  }
}
