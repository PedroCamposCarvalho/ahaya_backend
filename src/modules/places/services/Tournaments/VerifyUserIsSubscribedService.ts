import ITournamentsRepository from '@modules/places/repositories/Tournaments/ITournamentsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class VerifyUserIsSubscribedService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute(id_user: string): Promise<boolean> {
    const student = await this.tournamentsRepository.verifyUserIsSubscribed(
      id_user,
    );

    return student;
  }
}

export default VerifyUserIsSubscribedService;
