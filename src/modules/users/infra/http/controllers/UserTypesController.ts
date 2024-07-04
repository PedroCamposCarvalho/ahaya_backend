import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindUserTypeService from '@modules/users/services/FindUserTypeService';

export default class UserTypesController {
  public async findByTypeId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findType = container.resolve(FindUserTypeService);

    const user_type = await findType.execute(String(request.query.id_type));

    return response.json(user_type);
  }
}
