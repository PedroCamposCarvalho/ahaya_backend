import User from '../infra/typeorm/entities/User';
import UserLogins from '../infra/typeorm/entities/UserLogins';
import UserCategory from '../infra/typeorm/entities/UserCategory';
import UserTypes from '../infra/typeorm/entities/UserTypes';
import PasswordCode from '../infra/typeorm/entities/PasswordCode';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IReturnUserEventsDTO from '../dtos/IReturnUserEventsDTO';
import IFindAllUsersFiltersDTO from '../dtos/IFindAllUsersFiltersDTO';
import IFindAllUsersFiltersResponseDTO from '../dtos/IFindAllUsersFiltersResponseDTO';
import IUpdateUserCategoryDTO from '../dtos/IUpdateUserCategoryDTO';
import IReturnUserCategoriesDTO from '../dtos/IReturnUserCategoriesDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findBySsn(ssn: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findAllUsers(
    filters: IFindAllUsersFiltersDTO,
  ): Promise<IFindAllUsersFiltersResponseDTO>;
  findLikeName(name: string): Promise<User[]>;
  isUserVIP(id_user: string): Promise<boolean>;
  changeVIPStatus(id_user: string): Promise<User>;
  findAllBirthdaysOnToday(): Promise<User[]>;
  saveLogin(id_user: string): Promise<UserLogins>;
  verifyUserFirstLogin(id_user: string): Promise<UserLogins[]>;
  findNextEvents(id_user: string): Promise<IReturnUserEventsDTO[]>;
  updateNotificationId(id_user: string, id_notification: string): Promise<User>;
  findUserCategoryBySport(
    id_user: string,
    id_sport: string,
  ): Promise<UserCategory>;
  updateUserCategory(data: IUpdateUserCategoryDTO): Promise<UserCategory>;
  findAllUserCategories(id_user: string): Promise<IReturnUserCategoriesDTO[]>;
  verifyUserCategory(id_user: string): Promise<UserTypes>;
  findAllUserTypes(): Promise<UserTypes[]>;
  findAllAdminUsers(): Promise<User[]>;
  updateCustomerOneSignalId(
    id_user: string,
    oneSignalId: string,
  ): Promise<User>;
  createPasswordCode(id_user: string, code: string): Promise<PasswordCode>;
  validateLastCode(id_user: string, code: string): Promise<boolean>;
  deleteUser(id_user: string): Promise<User>;
}
