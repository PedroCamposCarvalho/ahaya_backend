import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateService from '@modules/privacy_policy/services/CreateService';
import FindService from '@modules/privacy_policy/services/FindService';

export default class PrivacyPolicyController {
  public async find(request: Request, response: Response): Promise<Response> {
    const findService = container.resolve(FindService);
    const privacyPolicy = await findService.execute(
      String(request.query.id_place),
    );
    return response.json(privacyPolicy);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createService = container.resolve(CreateService);
    const privacyPolicy = await createService.execute(request.body);
    return response.json(privacyPolicy);
  }
}
