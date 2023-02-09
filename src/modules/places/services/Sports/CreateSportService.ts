import { injectable, inject } from 'tsyringe';
import ICreateSportDTO from '../../dtos/Sports/ICreateSportDTO';
import Sport from '../../infra/typeorm/entities/Sports/Sport';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class CreateSportService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute({ name, id_type }: ICreateSportDTO): Promise<Sport> {
    const sport = this.sportsRepository.create({
      name,
      id_type,
    });

    return sport;
  }
}

export default CreateSportService;
