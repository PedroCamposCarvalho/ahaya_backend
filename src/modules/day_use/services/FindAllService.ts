import { injectable, inject } from 'tsyringe';
import DayUse from '../infra/typeorm/entities/DayUse';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class FindAllService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(limit: number, past: boolean): Promise<DayUse[]> {
    const dayUse = this.dayUseRepository.findAll(limit, past);

    return dayUse;
  }
}

export default FindAllService;
