import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindAllPlansService from '@modules/club/services/FindAllPlansService';
import FindAllRulesService from '@modules/club/services/FindAllRulesService';
import CreateMemberService from '@modules/club/services/CreateMemberService';
import FindMemberByIdService from '@modules/club/services/FindMemberByIdService';
import RedeemDrinkService from '@modules/club/services/RedeemDrinkService';
import DeleteClubMemberService from '@modules/club/services/DeleteClubMemberService';
import FindAllMembersService from '@modules/club/services/FindAllMembersService';
import FindAllExpiredMembersService from '@modules/club/services/FindAllExpiredMembersService';
import FindAllMembersCloseToExpireService from '@modules/club/services/FindAllMembersCloseToExpireService';

export default class ClubController {
  public async findAllPlans(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllPlansService = container.resolve(FindAllPlansService);
    const plans = await findAllPlansService.execute();

    return response.json(plans);
  }

  public async findAllRules(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllRulesService = container.resolve(FindAllRulesService);
    const rules = await findAllRulesService.execute();

    return response.json(rules);
  }

  public async createMember(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createMemberService = container.resolve(CreateMemberService);
    const member = await createMemberService.execute(request.body);
    return response.json(member);
  }

  public async findMemberById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findMemberByIdService = container.resolve(FindMemberByIdService);
    const member = await findMemberByIdService.execute(
      String(request.query.id_user),
    );
    return response.json(member);
  }

  public async redeemDrink(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const redeemDrinkService = container.resolve(RedeemDrinkService);
    const member = await redeemDrinkService.execute(
      String(request.query.id_member),
    );
    return response.json(member);
  }

  public async deleteClubMember(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteClubMemberService = container.resolve(DeleteClubMemberService);
    const member = await deleteClubMemberService.execute(
      String(request.query.id_member),
    );
    return response.json(member);
  }

  public async findAllMembers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllMembersService = container.resolve(FindAllMembersService);
    const members = await findAllMembersService.execute();

    return response.json(members);
  }

  public async findAllExpiredMembers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllExpiredMembersService = container.resolve(
      FindAllExpiredMembersService,
    );

    const members = await findAllExpiredMembersService.execute();

    return response.json(members);
  }

  public async findAllMembersCloseToExpire(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllMembersCloseToExpireService = container.resolve(
      FindAllMembersCloseToExpireService,
    );

    const members = await findAllMembersCloseToExpireService.execute();

    return response.json(members);
  }
}
