import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import FindAllSportsService from '@modules/places/services/Sports/FindAllSportsService';
import UpdateSportPhotoService from '@modules/places/services/Sports/UpdateSportPhotoService';
import FindByCourtIdService from '@modules/places/services/Sports/FindByCourtIdService';
import FindPriceBySportIdService from '@modules/places/services/Sports/FindPriceBySportIdService';
import FindSportsForPricesPageService from '@modules/places/services/Sports/FindSportsForPricesPageService';
// import FindCourtsBySportId from '@modules/places/services/Sports/FindCourtsBySportId';
import FindCategoryBySportService from '@modules/places/services/Sports/FindCategoryBySportService';
import CreateCategoryService from '@modules/places/services/Sports/CreateCategoryService';
import EditCategoryService from '@modules/places/services/Sports/EditCategoryService';
import CreateSportService from '@modules/places/services/Sports/CreateSportService';
import DeleteSportService from '@modules/places/services/Sports/DeleteSportService';

export default class SportcController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSportService = container.resolve(CreateSportService);
    const sport = await createSportService.execute(request.body);
    return response.json(sport);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getAllService = container.resolve(FindAllSportsService);
    const sports = await getAllService.execute();
    return response.json(sports);
  }

  public async updatePhoto(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updatePhotoService = container.resolve(UpdateSportPhotoService);
    const material = await updatePhotoService.execute({
      id: String(request.query.id),
      photoFileName: request?.file?.filename,
    });
    return response.json(classToClass(material));
  }

  public async findByCourtId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findByCourtIdService = container.resolve(FindByCourtIdService);
    const sports = await findByCourtIdService.execute(
      String(request.query.id_court),
    );
    return response.json(classToClass(sports));
  }

  public async findPriceBySportId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findByPriceService = container.resolve(FindPriceBySportIdService);
    const sport = await findByPriceService.execute(
      String(request.query.id_sport),
    );
    return response.json(sport);
  }

  public async findSportsForPricesPage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findSportsForPricesPageService = container.resolve(
      FindSportsForPricesPageService,
    );
    const sports = await findSportsForPricesPageService.execute();
    return response.json(sports);
  }

  public async findAllCategories(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_sport } = request.query;
    const findCategoryBySportService = container.resolve(
      FindCategoryBySportService,
    );

    const categories = await findCategoryBySportService.execute(
      String(id_sport),
    );

    return response.json(categories);
  }

  public async createCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createCategoryService = container.resolve(CreateCategoryService);
    const category = await createCategoryService.execute(request.body);
    return response.json(category);
  }

  public async updateCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const editCategoryService = container.resolve(EditCategoryService);
    const category = await editCategoryService.execute(request.body);
    return response.json(category);
  }

  public async deleteSport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_sport } = request.query;
    const deleteSportService = container.resolve(DeleteSportService);
    const sport = await deleteSportService.execute(String(id_sport));
    return response.json(sport);
  }
}
