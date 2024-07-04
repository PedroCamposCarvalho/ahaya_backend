import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllModulesService from '@modules/score/services/Modules/FindAllModulesService';

import CreateScoreRuleService from '@modules/score/services/ScoreRules/CreateScoreRuleService';
import UpdateScoreRuleService from '@modules/score/services/ScoreRules/UpdateScoreRuleService';
import FindAllScoreRulesService from '@modules/score/services/ScoreRules/FindAllScoreRulesService';
import DeleteScoreRuleService from '@modules/score/services/ScoreRules/DeleteScoreRuleService';
import FindUserPointsService from '@modules/score/services/User/FindUserPointsService';
import UpdateUserPointsService from '@modules/score/services/User/UpdateUserPointsService';
import CreateUserHistoryScoreService from '@modules/score/services/UserHistoryScore/CreateUserHistoryScoreService';

export default class ScoreController {
  public async findAllModules(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllModulesService = container.resolve(FindAllModulesService);
    const modules = await findAllModulesService.execute();

    return response.json(modules);
  }

  public async createScoreRule(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createScoreRuleService = container.resolve(CreateScoreRuleService);
    const scoreRule = await createScoreRuleService.execute(request.body);

    return response.json(scoreRule);
  }

  public async updateScoreRule(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateScoreRuleService = container.resolve(UpdateScoreRuleService);
    const scoreRule = await updateScoreRuleService.execute(request.body);

    return response.json(scoreRule);
  }

  public async findAllScoreRules(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllScoreRulesService = container.resolve(
      FindAllScoreRulesService,
    );
    const scoreRules = await findAllScoreRulesService.execute();

    return response.json(scoreRules);
  }

  public async deleteScoreRule(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteScoreRuleService = container.resolve(DeleteScoreRuleService);
    const scoreRule = await deleteScoreRuleService.execute(
      String(request.query.id),
    );

    return response.json(scoreRule);
  }

  public async findUserPoints(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUserPointsService = container.resolve(FindUserPointsService);
    const points = await findUserPointsService.execute(
      String(request.query.id_user),
    );

    return response.json(points);
  }

  public async updateUserPoints(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserPointsService = container.resolve(UpdateUserPointsService);
    const points = await updateUserPointsService.execute(request.body);

    return response.json(points);
  }

  public async createUserHistoryScore(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createUserHistoryScoreService = container.resolve(
      CreateUserHistoryScoreService,
    );
    const userHistoryScore = await createUserHistoryScoreService.execute(
      request.body,
    );

    return response.json(userHistoryScore);
  }
}
