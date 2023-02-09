import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateMaterialPhotoService from '@modules/places/services/Materials/UpdateMaterialPhotoService';
import CreateMaterialService from '../../../../services/Materials/CreateMaterialService';
import FindAllBySportService from '../../../../services/Materials/FindAllBySportService';
import FindByAppointmentService from '../../../../services/Materials/FindByAppointmentService';
import FindAllService from '../../../../services/Materials/FindAllService';

export default class MaterialsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { material, sport_id } = request.body;

    const createMaterial = container.resolve(CreateMaterialService);
    const newMaterial = await createMaterial.execute({
      material,
      sport_id,
    });

    return response.json(newMaterial);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updatePhotoService = container.resolve(UpdateMaterialPhotoService);
    const material = await updatePhotoService.execute({
      material_id: String(request.query.material_id),
      logoFilename: request.file.filename,
    });
    return response.json(classToClass(material));
  }

  public async findBySport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findBySportService = container.resolve(FindAllBySportService);
    const material = await findBySportService.execute(
      String(request.query.id_sport),
    );
    return response.json(material);
  }

  public async findByAppointment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findByAppointmentService = container.resolve(
      FindByAppointmentService,
    );
    const materials = await findByAppointmentService.execute(
      String(request.query.id_appointment),
    );
    return response.json(materials);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllService = container.resolve(FindAllService);
    const materials = await findAllService.execute();
    return response.json(materials);
  }
}
