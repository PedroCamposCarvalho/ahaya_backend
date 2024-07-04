import { injectable, inject } from 'tsyringe';
import Court from '../../infra/typeorm/entities/Courts/Court';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';
import IUpdateCourtDTO from '../../dtos/Courts/IUpdateCourtDTO';

@injectable()
class UpdateCourtNameService {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute(data: IUpdateCourtDTO): Promise<Court> {
    const court = await this.courtsRepository.update(data);
    return court;
  }
}

export default UpdateCourtNameService;
