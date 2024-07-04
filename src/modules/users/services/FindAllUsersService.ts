import { injectable, inject } from 'tsyringe';
import IFindAllUsersFiltersDTO from '../dtos/IFindAllUsersFiltersDTO';
import IFindAllUsersFiltersResponseDTO from '../dtos/IFindAllUsersFiltersResponseDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class FindAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    filters: IFindAllUsersFiltersDTO,
  ): Promise<IFindAllUsersFiltersResponseDTO> {
    const users = this.usersRepository.findAllUsers(filters);

    return users;
  }
}

export default FindAllUsersService;
