import TournamentInscriptions from '@modules/places/infra/typeorm/entities/Tournaments/TournamentInscriptions';
import ITournamentsRepository from '@modules/places/repositories/Tournaments/ITournamentsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class FindAllTournamentsInscriptionsService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute(): Promise<TournamentInscriptions[] | void> {
    const tournamentsInscriptions = await this.tournamentsRepository.findAll();

    return tournamentsInscriptions;
  }
}

export default FindAllTournamentsInscriptionsService;
