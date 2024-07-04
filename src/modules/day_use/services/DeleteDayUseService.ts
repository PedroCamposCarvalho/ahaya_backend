import { injectable, inject } from 'tsyringe';
import DayUse from '../infra/typeorm/entities/DayUse';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class DeleteDayUseService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(id_dayuse: string): Promise<DayUse> {
    const dayUse = this.dayUseRepository.deleteDayUse(id_dayuse);

    return dayUse;
  }
}

export default DeleteDayUseService;
