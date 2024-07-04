import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCancelationRuleService from '@modules/cancelation_rules/services/CreateCancelationRuleService';
import FindAllRulesService from '@modules/cancelation_rules/services/FindAllRulesService';
import UpdateCancelationRuleService from '@modules/cancelation_rules/services/UpdateCancelationRuleService';
import DeleteCancelationRuleService from '@modules/cancelation_rules/services/DeleteCancelationRuleService';

export default class CancelationRulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createCancelationRuleService = container.resolve(
      CreateCancelationRuleService,
    );
    const cancelationRule = await createCancelationRuleService.execute(
      request.body,
    );

    return response.json(cancelationRule);
  }

  public async findAllRules(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllRulesService = container.resolve(FindAllRulesService);
    const cancelationRules = await findAllRulesService.execute();

    return response.json(cancelationRules);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateCancelationRuleService = container.resolve(
      UpdateCancelationRuleService,
    );
    const cancelationRule = await updateCancelationRuleService.execute(
      request.body,
    );

    return response.json(cancelationRule);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCancelationRuleService = container.resolve(
      DeleteCancelationRuleService,
    );
    const cancelationRule = await deleteCancelationRuleService.execute(
      String(request.query.id),
    );

    return response.json(cancelationRule);
  }
}
