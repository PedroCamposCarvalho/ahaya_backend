import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import UserCategory from '../infra/typeorm/entities/UserCategory';

@injectable()
class FindUserCategoryBySportsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    id_user: string,
    id_sport: string,
  ): Promise<UserCategory> {
    const category = this.usersRepository.findUserCategoryBySport(
      id_user,
      id_sport,
    );

    return category;
  }
}

export default FindUserCategoryBySportsService;
