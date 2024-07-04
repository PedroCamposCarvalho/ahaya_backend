import { injectable, inject } from 'tsyringe';
import ICreateCourtDTO from '../../dtos/Courts/ICreateCourtDTO';
import Court from '../../infra/typeorm/entities/Courts/Court';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';

@injectable()
class CreateCourtService {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute({
    name,
    id_place,
    id_type,
    covered,
    sports,
  }: ICreateCourtDTO): Promise<Court> {
    const court = this.courtsRepository.create({
      name,
      id_place,
      id_type,
      covered,
      sports,
    });

    return court;
  }
}

export default CreateCourtService;
