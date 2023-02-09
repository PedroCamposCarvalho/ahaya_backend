import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdatePlaceLogoService from '@modules/places/services/Places/UpdatePlaceLogoService';

export default class PlaceLogoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateLogoService = container.resolve(UpdatePlaceLogoService);
    const place = await updateLogoService.execute({
      place_id: String(request.query.place_id),
      logoFilename: request.file.filename,
    });
    return response.json(classToClass(place));
  }
}
