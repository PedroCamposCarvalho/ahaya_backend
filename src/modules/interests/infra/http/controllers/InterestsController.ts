import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindAllInterests from '@modules/interests/services/FindAllInterests';
import CreateInterest from '@modules/interests/services/CreateInterest';
import FindItemByInterestsService from '@modules/interests/services/FindItemByInterestsService';
import CreateInterestItemService from '@modules/interests/services/CreateInterestItemService';

export default class InterestsController {
  public async findAllInterests(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllInterests = container.resolve(FindAllInterests);
    const interests = await findAllInterests.execute();
    return response.json(interests);
  }

  public async createInterest(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createInterestService = container.resolve(CreateInterest);
    const { name } = request.body;
    const interests = await createInterestService.execute(String(name));
    return response.json(interests);
  }

  public async findItemByInterests(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_interest } = request.query;
    const findItemByInterestsService = container.resolve(
      FindItemByInterestsService,
    );
    const interestsItems = await findItemByInterestsService.execute(
      String(id_interest),
    );
    return response.json(interestsItems);
  }

  public async createInterestItem(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createInteresItemtService = container.resolve(
      CreateInterestItemService,
    );
    const { name, id_interest } = request.body;
    const interestsitem = await createInteresItemtService.execute(
      String(name),
      String(id_interest),
    );
    return response.json(interestsitem);
  }
}
