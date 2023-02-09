import { injectable, inject } from 'tsyringe';
import IFindMothlyRequestsFilterDTO from '../dtos/IFindMothlyRequestsFilterDTO';
import IReturnFindMonthlyRequestsDTO from '../dtos/IReturnFindMonthlyRequestsDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class FindPendingRequestsService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(
    filters: IFindMothlyRequestsFilterDTO,
  ): Promise<IReturnFindMonthlyRequestsDTO> {
    const pendingRequests = await this.payersRepository.findAllPendingMonthlyRequests(
      filters,
    );

    return pendingRequests;
  }
}

export default FindPendingRequestsService;
