import { injectable, inject } from 'tsyringe';
import ClubMembers from '../infra/typeorm/entities/ClubMembers';
import IClubRepository from '../repositories/IClubRepository';

@injectable()
class RedeemDrinkService {
  constructor(
    @inject('ClubRepository')
    private clubRepository: IClubRepository,
  ) {}

  public async execute(id_member: string): Promise<ClubMembers> {
    const member = await this.clubRepository.redeemDrink(id_member);

    return member;
  }
}

export default RedeemDrinkService;
