import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateCourtService from '../../../../services/Courts/CreateCourtService';
import GetCourtsService from '../../../../services/Courts/GetCourtsService';
import FindLikeNameService from '../../../../services/Courts/FindLikeNameService';
import FindByIdService from '../../../../services/Courts/FindByIdService';
import UpdateCourtNameService from '../../../../services/Courts/UpdateCourtNameService';
import UpdateCourtService from '../../../../services/Courts/UpdateCourtService';
import FindCourtBySportService from '../../../../services/Courts/FindCourtBySportService';
import FindCourtSportService from '../../../../services/Courts/FindCourtSportService';
import FindAllCourtTypesService from '../../../../services/Courts/FindAllCourtTypesService';
import DeleteCourtService from '../../../../services/Courts/DeleteCourtService';

export default class CourtsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, id_place, id_type, sports, covered } = request.body;

    const createCourt = container.resolve(CreateCourtService);
    const court = await createCourt.execute({
      name,
      id_place,
      id_type,
      sports,
      covered,
    });

    return response.json(court);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_place, page } = request.query;
    const getAllService = container.resolve(GetCourtsService);
    const courts = await getAllService.execute(String(id_place), Number(page));
    return response.json(classToClass(courts));
  }

  public async findLikeName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_place, name } = request.query;
    const findLikeName = container.resolve(FindLikeNameService);
    const courts = await findLikeName.execute(String(id_place), String(name));
    return response.json(classToClass(courts));
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.query;
    const findById = container.resolve(FindByIdService);
    const court = await findById.execute(String(id));
    return response.json(classToClass(court));
  }

  public async updateCourtName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, name } = request.body;
    const updateName = container.resolve(UpdateCourtNameService);
    const court = await updateName.execute(String(id), String(name));
    return response.json(classToClass(court));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updatePhotoService = container.resolve(UpdateCourtService);
    const court = await updatePhotoService.execute(request.body);
    return response.json(court);
  }

  public async findCourtsBySportId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findCourtBySportService = container.resolve(FindCourtBySportService);
    const courts = await findCourtBySportService.execute(
      String(request.query.id_sport),
    );
    return response.json(classToClass(courts));
  }

  public async findCourtSport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findCourtSportService = container.resolve(FindCourtSportService);
    const { id_place } = request.query;
    const courtSport = await findCourtSportService.execute(String(id_place));
    return response.json(courtSport);
  }

  public async findAllCourtTypes(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllCourtTypesService = container.resolve(
      FindAllCourtTypesService,
    );

    const courtTypes = await findAllCourtTypesService.execute();
    return response.json(courtTypes);
  }

  public async deleteCourt(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteCourtService = container.resolve(DeleteCourtService);

    const { id_court } = request.query;

    const court = await deleteCourtService.execute(String(id_court));
    return response.json(court);
  }
}
