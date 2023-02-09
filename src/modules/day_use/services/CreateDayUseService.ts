import { injectable, inject } from 'tsyringe';
import ICreateDayUseDTO from '../dtos/ICreateDayUseDTO';
import DayUse from '../infra/typeorm/entities/DayUse';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class CreateDayUseService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(data: ICreateDayUseDTO): Promise<DayUse> {
    const dayUse = this.dayUseRepository.create(data);

    return dayUse;
  }
}

export default CreateDayUseService;
