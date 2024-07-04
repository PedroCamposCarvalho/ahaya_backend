import IReturnReportInscriptionsDTO from '@modules/places/dtos/Tournaments/IReturnReportInscriptionsDTO';
import ITournamentsRepository from '@modules/places/repositories/Tournaments/ITournamentsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class FindAllTournamentsInscriptionsService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute(): Promise<IReturnReportInscriptionsDTO[]> {
    const tournamentsInscriptions =
      await this.tournamentsRepository.findReportInscriptions();

    return tournamentsInscriptions;
  }
}

export default FindAllTournamentsInscriptionsService;
