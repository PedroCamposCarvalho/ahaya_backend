import { getRepository, Repository } from 'typeorm';

import IClubRepository from '@modules/club/repositories/IClubRepository';
import AppError from '@shared/errors/AppError';
import { addMonths } from 'date-fns';
import ICreateMemberDTO from '../../../dtos/ICreateMemberDTO';
import IReturnFindAllMembersDTO from '../../../dtos/IReturnFindAllMembersDTO';

import ClubPlans from '../entities/ClubPlans';
import ClubRules from '../entities/ClubRules';
import ClubMembers from '../entities/ClubMembers';

class ClubRepository implements IClubRepository {
  private plansRepository: Repository<ClubPlans>;

  private rulesRepository: Repository<ClubRules>;

  private membersRepository: Repository<ClubMembers>;

  constructor() {
    this.plansRepository = getRepository(ClubPlans);
    this.rulesRepository = getRepository(ClubRules);
    this.membersRepository = getRepository(ClubMembers);
  }

  public async findAllPlans(): Promise<ClubPlans[]> {
    const plans = await this.plansRepository.find();
    return plans;
  }

  public async findAllRules(): Promise<ClubRules[]> {
    const rules = await this.rulesRepository.find();
    return rules;
  }

  public async createClubMember(data: ICreateMemberDTO): Promise<ClubMembers> {
    const expires_in = addMonths(new Date(), 1);

    const member = await this.membersRepository.findOne({
      where: {
        id_user: data.id_user,
      },
    });

    if (member) {
      member.id_plan = data.id_plan;
      member.expires_in = expires_in;
      await this.membersRepository.save(member);

      return member;
    }

    const { id_user, id_plan, id_transaction } = data;

    const newMember = await this.membersRepository.create({
      id_user,
      id_plan,
      id_transaction,
      expires_in,
    });

    await this.membersRepository.save(newMember);
    return newMember;
  }

  public async findMemberById(id_user: string): Promise<ClubMembers> {
    const member = await this.membersRepository.query(
      `select mem.id, plan.months, mem.expires_in, mem.drink from club_members mem inner join club_plans plan on mem.id_plan = plan.id where mem.id_user='${id_user}'`,
    );
    if (!member[0]) {
      throw new AppError('Member not found');
    }

    return member[0];
  }

  public async redeemDrink(id_member: string): Promise<ClubMembers> {
    const member = await this.membersRepository.findOne({
      where: { id: id_member },
    });
    if (!member) {
      throw new AppError('Member not found');
    }
    member.drink = false;
    await this.membersRepository.save(member);
    return member;
  }

  public async deleteClubMember(id_member: string): Promise<ClubMembers> {
    const member = await this.membersRepository.findOne({
      where: { id: id_member },
    });
    if (!member) {
      throw new AppError('User not found');
    }
    await this.membersRepository.remove(member);
    return member;
  }

  public async findAllMembers(): Promise<IReturnFindAllMembersDTO[]> {
    const members = await this.membersRepository.query(
      `select mem.id, mem.id_user, use.name, plan.description, mem.expires_in, mem.drink from club_members mem inner join users use on mem.id_user = use.id inner join club_plans plan on mem.id_plan = plan.id`,
    );

    return members;
  }

  public async findAllExpiredMembers(): Promise<IReturnFindAllMembersDTO[]> {
    const members = await this.membersRepository.query(
      `select mem.id, mem.id_user, use.name, plan.description, mem.expires_in, mem.drink from club_members mem inner join users use on mem.id_user = use.id inner join club_plans plan on mem.id_plan = plan.id where mem.expires_in < now()`,
    );

    return members;
  }

  public async findAllMembersCloseToExpire(): Promise<
    IReturnFindAllMembersDTO[]
  > {
    const members = await this.membersRepository.query(
      `select mem.id, mem.id_user, use.name, plan.description, mem.expires_in, mem.drink from club_members mem inner join users use on mem.id_user = use.id inner join club_plans plan on mem.id_plan = plan.id where (SELECT (mem.expires_in::date - now()::date) AS days) < 7`,
    );

    return members;
  }
}
export default ClubRepository;
