import { injectable, inject } from 'tsyringe';
import Modules from '../../infra/typeorm/entities/Modules';
import IScoreRepository from '../../repositories/IScoreRepository';

@injectable()
class FindAllModulesService {
  constructor(
    @inject('ScoreRepository')
    private scoreRepository: IScoreRepository,
  ) {}

  public async execute(): Promise<Modules[]> {
    const modules = await this.scoreRepository.findAllModules();

    return modules;
  }
}

export default FindAllModulesService;
