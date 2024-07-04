import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindService from '@modules/places/services/TermsConditions/FindService';

export default class TermsConditionsController {
  public async find(request: Request, response: Response): Promise<Response> {
    const findService = container.resolve(FindService);
    const terms = await findService.execute();
    return response.json(terms);
  }
}
