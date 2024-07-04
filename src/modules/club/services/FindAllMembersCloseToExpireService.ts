import { injectable, inject } from 'tsyringe';
import IReturnFindAllMembersDTO from '../dtos/IReturnFindAllMembersDTO';
import IClubRepository from '../repositories/IClubRepository';

@injectable()
class FindAllMembersCloseToExpireService {
  constructor(
    @inject('ClubRepository')
    private clubRepository: IClubRepository,
  ) {}

  public async execute(): Promise<IReturnFindAllMembersDTO[]> {
    const members = await this.clubRepository.findAllMembersCloseToExpire();

    return members;
  }
}

export default FindAllMembersCloseToExpireService;
