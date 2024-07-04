import ICreateMemberDTO from '../dtos/ICreateMemberDTO';
import IReturnFindAllMembersDTO from '../dtos/IReturnFindAllMembersDTO';
import ClubPlans from '../infra/typeorm/entities/ClubPlans';
import ClubRules from '../infra/typeorm/entities/ClubRules';
import ClubMembers from '../infra/typeorm/entities/ClubMembers';

export default interface IClubRepository {
  findAllPlans(): Promise<ClubPlans[]>;
  findAllRules(): Promise<ClubRules[]>;
  createClubMember(data: ICreateMemberDTO): Promise<ClubMembers>;
  findMemberById(id_user: string): Promise<ClubMembers>;
  redeemDrink(id_member: string): Promise<ClubMembers>;
  deleteClubMember(id_member: string): Promise<ClubMembers>;
  findAllMembers(): Promise<IReturnFindAllMembersDTO[]>;
  findAllExpiredMembers(): Promise<IReturnFindAllMembersDTO[]>;
  findAllMembersCloseToExpire(): Promise<IReturnFindAllMembersDTO[]>;
}
