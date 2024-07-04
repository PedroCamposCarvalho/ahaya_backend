import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreatePlaceService from '@modules/places/services/Places/CreatePlaceService';
import GetPlacesService from '@modules/places/services/Places/GetPlacesService';
import FindByIdService from '@modules/places/services/Places/FindByIdService';
import FindWebPropsService from '@modules/places/services/Places/FindWebPropsService';

export default class PlacesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      telephone,
      street,
      number,
      complement,
      zip_code,
      city,
      state,
      country,
    } = request.body;

    const createPlace = container.resolve(CreatePlaceService);
    const place = await createPlace.execute({
      name,
      telephone,
      street,
      number,
      complement,
      zip_code,
      city,
      state,
      country,
    });

    return response.json(classToClass(place));
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getAllService = container.resolve(GetPlacesService);
    const places = await getAllService.execute();
    return response.json(classToClass(places));
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findByIdService = container.resolve(FindByIdService);
    const { id } = request.query;
    const place = await findByIdService.execute(String(id));
    return response.json(classToClass(place));
  }

  public async findWebProps(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findWebPropsService = container.resolve(FindWebPropsService);
    const place = await findWebPropsService.execute();
    return response.json(place);
  }
}
