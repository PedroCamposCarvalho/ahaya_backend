import { injectable, inject } from 'tsyringe';
import Court from '../../infra/typeorm/entities/Courts/Court';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';

interface IRequest {
  court_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListCourtAvailabilityService {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute({
    court_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    return [{ day: 1, available: false }];
  }
}

export default ListCourtAvailabilityService;
