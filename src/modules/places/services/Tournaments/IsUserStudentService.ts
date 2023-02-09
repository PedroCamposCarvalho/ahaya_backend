import ITournamentsRepository from '@modules/places/repositories/Tournaments/ITournamentsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class IsUserStudentService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute(ssn: string): Promise<boolean> {
    const student = await this.tournamentsRepository.isUserStudent(ssn);

    return student;
  }
}

export default IsUserStudentService;
