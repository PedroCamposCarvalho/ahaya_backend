import Modules from '../infra/typeorm/entities/Modules';
import ScoreRule from '../infra/typeorm/entities/ScoreRule';
import UserHistoryScore from '../infra/typeorm/entities/UserHistoryScore';
import UserUsedHistoryScore from '../infra/typeorm/entities/UserUsedHistoryScore';

import ICreateScoreRuleDTO from '../dtos/ICreateScoreRuleDTO';
import IUpdateScoreRuleDTO from '../dtos/IUpdateScoreRuleDTO';
import IReturnFindAllScoreRulesDTO from '../dtos/IReturnFindAllScoreRulesDTO';
import IUpdateUserPointsDT0 from '../dtos/IUpdateUserPointsDT0';

import ICreateUserHistoryScoreDTO from '../dtos/ICreateUserHistoryScoreDTO';

import ICreateUserUsedHistoryScoreDTO from '../dtos/ICreateUserUsedHistoryScoreDTO';

export default interface IScoreRepository {
  // modules
  findAllModules(): Promise<Modules[]>;
  // score_rules
  createScoreRule(data: ICreateScoreRuleDTO): Promise<ScoreRule>;
  updateScoreRule(data: IUpdateScoreRuleDTO): Promise<ScoreRule>;
  findAllScoreRules(): Promise<IReturnFindAllScoreRulesDTO[]>;
  deleteScoreRule(id: string): Promise<ScoreRule>;
  // user
  findUserPoints(id_user: string): Promise<number>;
  updateUserPoints(data: IUpdateUserPointsDT0): Promise<boolean>;
  // // user_history_score
  createUserHistory(
    data: ICreateUserHistoryScoreDTO,
  ): Promise<UserHistoryScore>;
  // findUserHistoryByUser(id_user: string): Promise<UserHistoryScore>;
  // // user_used_history_score
  createUserUsedHistory(
    data: ICreateUserUsedHistoryScoreDTO,
  ): Promise<UserUsedHistoryScore>;
  // findUserUsedHistoryByUser(id_user: string): Promise<UserHistoryScore>;
}
