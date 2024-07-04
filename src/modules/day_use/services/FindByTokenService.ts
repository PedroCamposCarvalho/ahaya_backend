import { injectable, inject } from 'tsyringe';
import DayUse from '../infra/typeorm/entities/DayUse';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class FindByTokenService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(token: string): Promise<DayUse> {
    const dayUse = this.dayUseRepository.findByToken(token);

    return dayUse;
  }
}

export default FindByTokenService;
