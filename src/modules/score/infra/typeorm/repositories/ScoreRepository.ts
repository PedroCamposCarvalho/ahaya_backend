import { getRepository, Repository } from 'typeorm';

import IScoreRepository from '@modules/score/repositories/IScoreRepository';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import Modules from '../entities/Modules';
import ScoreRule from '../entities/ScoreRule';
import UserHistoryScore from '../entities/UserHistoryScore';
import UserUsedHistoryScore from '../entities/UserUsedHistoryScore';

import ICreateScoreRuleDTO from '../../../dtos/ICreateScoreRuleDTO';
import IUpdateScoreRuleDTO from '../../../dtos/IUpdateScoreRuleDTO';
import IReturnFindAllScoreRulesDTO from '../../../dtos/IReturnFindAllScoreRulesDTO';
import IUpdateUserPointsDT0 from '../../../dtos/IUpdateUserPointsDT0';
import ICreateUserHistoryScoreDTO from '../../../dtos/ICreateUserHistoryScoreDTO';
import ICreateUserUsedHistoryScoreDTO from '../../../dtos/ICreateUserUsedHistoryScoreDTO';

class ScoreRepository implements IScoreRepository {
  private modulesRepository: Repository<Modules>;

  private scoreRuleRepository: Repository<ScoreRule>;

  private userHistoryRepository: Repository<UserHistoryScore>;

  private userUsedHistoryRepository: Repository<UserUsedHistoryScore>;

  private userRepository: Repository<User>;

  constructor() {
    this.modulesRepository = getRepository(Modules);
    this.scoreRuleRepository = getRepository(ScoreRule);
    this.userHistoryRepository = getRepository(UserHistoryScore);
    this.userUsedHistoryRepository = getRepository(UserUsedHistoryScore);
    this.userRepository = getRepository(User);
  }

  public async findAllModules(): Promise<Modules[]> {
    const modules = await this.modulesRepository.find();
    return modules;
  }

  public async createScoreRule(data: ICreateScoreRuleDTO): Promise<ScoreRule> {
    const scoreRule = await this.scoreRuleRepository.create(data);
    await this.scoreRuleRepository.save(scoreRule);
    return scoreRule;
  }

  public async updateScoreRule(data: IUpdateScoreRuleDTO): Promise<ScoreRule> {
    const { id, id_module, price, points, each_point_worth, description } =
      data;
    const scoreRule = await this.scoreRuleRepository.findOne({ where: { id } });
    if (!scoreRule) {
      throw new AppError('Score Rule not found');
    }
    scoreRule.id_module = id_module;
    scoreRule.price = price;
    scoreRule.points = points;
    scoreRule.each_point_worth = each_point_worth;
    scoreRule.description = description;
    // scoreRule.discount = discount;

    await this.scoreRuleRepository.save(scoreRule);
    return scoreRule;
  }

  public async findAllScoreRules(): Promise<IReturnFindAllScoreRulesDTO[]> {
    const query = this.scoreRuleRepository.createQueryBuilder('sco');

    query.select('sco.id', 'id');
    query.addSelect('sco.price', 'price');
    query.addSelect('sco.points', 'points');
    query.addSelect('sco.each_point_worth', 'each_point_worth');
    query.addSelect('sco.description', 'description');
    query.addSelect('sco.discount', 'discount');
    query.addSelect('sco.image', 'image');
    query.leftJoin('modules', 'mod', 'sco.id_module = mod.id');
    query.addSelect('mod.name', 'module');

    const scoreRules = await query.execute();
    return scoreRules;
  }

  public async deleteScoreRule(id: string): Promise<ScoreRule> {
    const scoreRule = await this.scoreRuleRepository.findOne({ where: { id } });
    if (!scoreRule) {
      throw new AppError('Score Rule not found');
    }
    await this.scoreRuleRepository.remove(scoreRule);

    return scoreRule;
  }

  public async findUserPoints(id_user: string): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id: id_user } });
    if (!user) {
      throw new AppError('User not found');
    }
    return user.points;
  }

  public async updateUserPoints(data: IUpdateUserPointsDT0): Promise<boolean> {
    const { id_user, points } = data;
    const user = await this.userRepository.findOne({ where: { id: id_user } });
    if (!user) {
      throw new AppError('User not found');
    }
    user.points = points;

    await this.userRepository.save(user);
    return true;
  }

  public async createUserHistory(
    data: ICreateUserHistoryScoreDTO,
  ): Promise<UserHistoryScore> {
    const userHistory = await this.userHistoryRepository.create(data);
    await this.userHistoryRepository.save(userHistory);
    return userHistory;
  }

  public async createUserUsedHistory(
    data: ICreateUserUsedHistoryScoreDTO,
  ): Promise<UserUsedHistoryScore> {
    const userUsedHistory = await this.userUsedHistoryRepository.create(data);

    await this.userUsedHistoryRepository.save(userUsedHistory);

    return userUsedHistory;
  }
}
export default ScoreRepository;
