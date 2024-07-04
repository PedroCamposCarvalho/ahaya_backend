import { injectable, inject } from 'tsyringe';
import IUpdateUserCategoryDTO from '../dtos/IUpdateUserCategoryDTO';
import UserCategory from '../infra/typeorm/entities/UserCategory';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateUserCategoryService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IUpdateUserCategoryDTO): Promise<UserCategory> {
    const userCategory = this.usersRepository.updateUserCategory(data);

    return userCategory;
  }
}

export default UpdateUserCategoryService;
