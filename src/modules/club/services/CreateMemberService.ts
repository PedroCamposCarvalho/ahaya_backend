import { injectable, inject } from 'tsyringe';
import ClubMembers from '../infra/typeorm/entities/ClubMembers';
import ICreateMemberDTO from '../dtos/ICreateMemberDTO';
import IClubRepository from '../repositories/IClubRepository';

@injectable()
class CreateMemberService {
  constructor(
    @inject('ClubRepository')
    private clubRepository: IClubRepository,
  ) {}

  public async execute(data: ICreateMemberDTO): Promise<ClubMembers> {
    const member = await this.clubRepository.createClubMember(data);

    return member;
  }
}

export default CreateMemberService;
