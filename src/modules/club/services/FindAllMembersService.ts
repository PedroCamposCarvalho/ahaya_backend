import { injectable, inject } from 'tsyringe';
import IReturnFindAllMembersDTO from '../dtos/IReturnFindAllMembersDTO';
import IClubRepository from '../repositories/IClubRepository';

@injectable()
class FindAllMembersService {
  constructor(
    @inject('ClubRepository')
    private clubRepository: IClubRepository,
  ) {}

  public async execute(): Promise<IReturnFindAllMembersDTO[]> {
    const members = await this.clubRepository.findAllMembers();

    return members;
  }
}

export default FindAllMembersService;
