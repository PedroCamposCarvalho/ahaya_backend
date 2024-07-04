/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';
import FindAllUsersService from '@modules/users/services/FindAllUsersService';
import FindLikeNameService from '@modules/users/services/FindLikeNameService';
import IsUserVIPService from '@modules/users/services/IsUserVIPService';
import ChangeVIPStatusService from '@modules/users/services/ChangeVIPStatusService';
import FindByIdService from '@modules/users/services/FindByIdService';
import FindBySsnService from '@modules/users/services/FindBySsnService';
import FindByEmailService from '@modules/users/services/FindByEmailService';
import FindAllBirthdaysOnTodayService from '@modules/users/services/FindAllBirthdaysOnTodayService';
import VerifyUserFirstLoginService from '@modules/users/services/VerifyUserFirstLoginService';
import CreateFirstLoginPasswordService from '@modules/users/services/CreateFirstLoginPasswordService';
import SaveLoginHistoryService from '@modules/users/services/SaveLoginHistoryService';
import FindNextEventsService from '@modules/users/services/FindNextEventsService';
import UpdateNotificationIdService from '@modules/users/services/UpdateNotificationIdService';
import FindUserCategoryBySportsService from '@modules/users/services/FindUserCategoryBySportsService';
import UpdateUserCategoryService from '@modules/users/services/UpdateUserCategoryService';
import TestSocket from '@modules/users/services/TestSocket';
import IsUserAdminService from '@modules/users/services/IsUserAdminService';
import FindAllUserTypesService from '@modules/users/services/FindAllUserTypesService';
import CreatePasswordCodeService from '@modules/users/services/CreatePasswordCodeService';
import ValidateLastCodeService from '@modules/users/services/ValidateLastCodeService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async findNextEvents(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findNextEventsService = container.resolve(FindNextEventsService);
    const { id_user } = request.query;

    const events = await findNextEventsService.execute(String(id_user));

    return response.json(events);
  }

  public async testeSocketIo(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const testSocket = container.resolve(TestSocket);
    testSocket.execute();

    return response.json({ ok: true });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      ssn,
      password,
      id_place,
      user_type,
      is_monthly,
      cellphone,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      notification_id,
      birth_date,
      gender,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      ssn,
      password,
      id_place,
      user_type,
      is_monthly,
      cellphone,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      notification_id,
      gender,
      birth_date,
    });

    return response.json(classToClass(user));
  }

  public async findAllUsers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUsersService = container.resolve(FindAllUsersService);
    const filters = request.query;
    const users = await findUsersService.execute(filters as any);
    return response.json(classToClass(users));
  }

  public async findLikeName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findLikeNameService = container.resolve(FindLikeNameService);
    const users = await findLikeNameService.execute(String(request.query.name));
    return response.json(classToClass(users));
  }

  public async isUserVIP(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const isUserVIPService = container.resolve(IsUserVIPService);
    const isUserVIP = await isUserVIPService.execute(
      String(request.query.id_user),
    );
    return response.json(isUserVIP);
  }

  public async changeVIPStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const changeVIPStatusService = container.resolve(ChangeVIPStatusService);
    const user = await changeVIPStatusService.execute(
      String(request.query.id_user),
    );
    return response.json(classToClass(user));
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findByIdService = container.resolve(FindByIdService);

    const user = await findByIdService.execute(String(request.query.id_user));

    return response.json(user);
  }

  public async findBySsn(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findBySsnService = container.resolve(FindBySsnService);
    const user = await findBySsnService.execute(String(request.query.ssn));
    return response.json(user);
  }

  public async findByEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findByEmailService = container.resolve(FindByEmailService);
    const user = await findByEmailService.execute(String(request.query.email));
    return response.json(user);
  }

  public async findAllBirthdays(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllBirthdaysOnTodayService = container.resolve(
      FindAllBirthdaysOnTodayService,
    );
    const users = await findAllBirthdaysOnTodayService.execute();

    return response.json(users);
  }

  public async verifyUserFirstLogin(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const verifyUserFirstLoginService = container.resolve(
      VerifyUserFirstLoginService,
    );
    const logins = await verifyUserFirstLoginService.execute(
      String(request.query.id_user),
    );

    return response.json(logins);
  }

  public async createFirstLoginPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createFirstLoginPasswordService = container.resolve(
      CreateFirstLoginPasswordService,
    );
    const user = await createFirstLoginPasswordService.execute(request.body);

    return response.json(user);
  }

  public async saveLoginHistory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const saveLoginHistoryService = container.resolve(SaveLoginHistoryService);
    const user = await saveLoginHistoryService.execute(
      String(request.query.id_user),
    );

    return response.json(user);
  }

  public async updateNotificationId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateNotificationIdService = container.resolve(
      UpdateNotificationIdService,
    );
    const { id_user, id_notification } = request.query;

    const user = await updateNotificationIdService.execute(
      String(id_user),
      String(id_notification),
    );

    return response.json(user);
  }

  public async findUserCategoryBySport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUserCategoryBySportsService = container.resolve(
      FindUserCategoryBySportsService,
    );
    const { id_user, id_sport } = request.query;

    const category = await findUserCategoryBySportsService.execute(
      String(id_user),
      String(id_sport),
    );

    return response.json(category);
  }

  public async updateUserCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserCategoryService = container.resolve(
      UpdateUserCategoryService,
    );

    const userCategory = await updateUserCategoryService.execute(request.body);

    return response.json(userCategory);
  }

  public async isUserAdmin(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_user } = request.query;

    const isUserAdminService = container.resolve(IsUserAdminService);

    const userCategory = await isUserAdminService.execute(String(id_user));

    return response.json(userCategory);
  }

  public async findAllUserTypes(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllUserTypesService = container.resolve(FindAllUserTypesService);

    const userTypes = await findAllUserTypesService.execute();

    return response.json(userTypes);
  }

  public async createPasswordCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createPasswordCodeService = container.resolve(
      CreatePasswordCodeService,
    );

    const passwordCode = await createPasswordCodeService.execute(
      String(request.body.email),
    );

    return response.json(passwordCode);
  }

  public async validateLastCode(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const validateLastCodeService = container.resolve(ValidateLastCodeService);

    const { email, code } = request.query;

    const codeValid = await validateLastCodeService.execute(
      String(email),
      String(code),
    );

    return response.json(codeValid);
  }

  public async deleteUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteUserService = container.resolve(DeleteUserService);

    const { id_user } = request.query;

    const user = await deleteUserService.execute(String(id_user));

    return response.json(user);
  }
}
