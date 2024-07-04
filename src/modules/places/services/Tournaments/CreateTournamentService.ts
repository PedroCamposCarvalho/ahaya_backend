import { injectable, inject } from 'tsyringe';
import ICreateTournamentInscriptionDTO from '@modules/places/dtos/Tournaments/ICreateTournamentInscriptionDTO';
import ITournamentsRepository from '@modules/places/repositories/Tournaments/ITournamentsRepository';
import AppError from '@shared/errors/AppError';
import TournamentInscriptions from '@modules/places/infra/typeorm/entities/Tournaments/TournamentInscriptions';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class CreateTournamentService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    data: ICreateTournamentInscriptionDTO,
  ): Promise<TournamentInscriptions> {
    try {
      const findUser = await this.usersRepository.findById(data.id_user);

      if (!findUser) {
        throw new AppError('User not found!');
      }

      const tournamentInscription =
        await this.tournamentsRepository.createTournamentInscription(data);
      return tournamentInscription;
    } catch {
      throw new AppError('Error on creating a inscription!');
    }
  }
}

export default CreateTournamentService;
