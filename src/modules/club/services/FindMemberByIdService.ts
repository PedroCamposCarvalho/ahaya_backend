import { injectable, inject } from 'tsyringe';
import ClubMembers from '../infra/typeorm/entities/ClubMembers';
import IClubRepository from '../repositories/IClubRepository';

@injectable()
class FindMemberByIdService {
  constructor(
    @inject('ClubRepository')
    private clubRepository: IClubRepository,
  ) {}

  public async execute(id_user: string): Promise<ClubMembers> {
    const member = await this.clubRepository.findMemberById(id_user);

    return member;
  }
}

export default FindMemberByIdService;
