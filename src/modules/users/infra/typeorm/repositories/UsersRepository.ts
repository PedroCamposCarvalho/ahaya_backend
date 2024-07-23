import { getRepository, Repository, Raw } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IReturnUserEventsDTO from '@modules/users/dtos/IReturnUserEventsDTO';
import IReturnUserCategoriesDTO from '@modules/users/dtos/IReturnUserCategoriesDTO';
// import Appointment from '@modules/places/infra/typeorm/entities/Appointments/Appointment';
import IFindAllUsersFiltersDTO from '@modules/users/dtos/IFindAllUsersFiltersDTO';
import IFindAllUsersFiltersResponseDTO from '@modules/users/dtos/IFindAllUsersFiltersResponseDTO';
import IUpdateUserCategoryDTO from '@modules/users/dtos/IUpdateUserCategoryDTO';
import Sport from '@modules/places/infra/typeorm/entities/Sports/Sport';
import TeacherWeekClass from '@modules/teachers/infra/typeorm/entities/TeacherWeekClass';

import AppError from '../../../../../shared/errors/AppError';
import User from '../entities/User';
import UserLogins from '../entities/UserLogins';
import UserCategory from '../entities/UserCategory';
import UserTypes from '../entities/UserTypes';
import PasswordCode from '../entities/PasswordCode';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  private loginRepository: Repository<UserLogins>;

  private userCategoryRepository: Repository<UserCategory>;

  private sportsRepository: Repository<Sport>;

  private weekClassRepository: Repository<TeacherWeekClass>;

  private userTypeRepository: Repository<UserTypes>;

  private passwordCodeRepository: Repository<PasswordCode>;

  constructor() {
    this.ormRepository = getRepository(User);
    this.loginRepository = getRepository(UserLogins);
    this.userCategoryRepository = getRepository(UserCategory);
    this.sportsRepository = getRepository(Sport);
    this.weekClassRepository = getRepository(TeacherWeekClass);
    this.userTypeRepository = getRepository(UserTypes);
    this.passwordCodeRepository = getRepository(PasswordCode);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);

    const sports = await this.sportsRepository.find();

    sports.map(async sport => {
      const userCategory = await this.userCategoryRepository.create({
        id_user: user.id,
        id_sport: sport.id,
      });
      await this.userCategoryRepository.save(userCategory);
    });

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findAllUsers({
    limit = 10,
    offset = 0,
    name,
    orderNameBy = 'ASC',
  }: IFindAllUsersFiltersDTO): Promise<IFindAllUsersFiltersResponseDTO> {
    const query = this.ormRepository.createQueryBuilder('users');

    const count = await query.getCount();

    query.select('users.id', 'id');
    query.addSelect('users.name', 'name');
    query.addSelect('users.ssn', 'ssn');
    query.addSelect('users.cellphone', 'cellphone');
    query.addSelect('users.email', 'email');

    query.orderBy('name', orderNameBy);

    if (name) {
      query.andWhere(`LOWER(name) like LOWER('%${name}%')`);
    }

    const users = await query.execute();

    return {
      count,
      users,
    };
  }

  public async findLikeName(name: string): Promise<User[]> {
    const users = await this.ormRepository.query(
      `select * from users where LOWER(name) like LOWER('%${name}%')`,
    );
    return users;
  }

  public async isUserVIP(id_user: string): Promise<boolean> {
    const user = await this.ormRepository.findOne({
      where: {
        id: id_user,
      },
    });
    if (!user) {
      throw new AppError('User not found');
    }
    return user.vip;
  }

  public async changeVIPStatus(id_user: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: {
        id: id_user,
      },
    });
    if (!user) {
      throw new AppError('User not found');
    }

    user.vip = true;

    await this.ormRepository.save(user);

    return user;
  }

  public async findAllBirthdaysOnToday(): Promise<User[]> {
    const now = new Date();
    const parsedMonth = String(now.getMonth() + 1).padStart(2, '0');
    const parsedDay = String(now.getDate()).padStart(2, '0');

    const users = await this.ormRepository.find({
      where: {
        birth_date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM') = '${parsedDay}-${parsedMonth}'`,
        ),
      },
    });
    return users;
  }

  public async saveLogin(id_user: string): Promise<UserLogins> {
    const login = await this.loginRepository.create({ id_user });

    await this.loginRepository.save(login);

    return login;
  }

  public async verifyUserFirstLogin(id_user: string): Promise<UserLogins[]> {
    const logins = await this.loginRepository.find({
      where: {
        id_user,
      },
    });

    return logins;
  }

  public async updateNotificationId(
    id_user: string,
    id_notification: string,
  ): Promise<User> {
    const user = await this.ormRepository.findOne({ where: { id: id_user } });

    if (!user) {
      throw new AppError('User not found');
    }

    user.one_signal_id = id_notification;

    await this.ormRepository.save(user);

    return user;
  }

  public async findNextEvents(
    id_user: string,
  ): Promise<IReturnUserEventsDTO[]> {
    const today = new Date();
    const year = String(today.getFullYear());
    const parsedMonth = String(today.getMonth() + 1).padStart(2, '0');
    const parsedDay = String(today.getDate()).padStart(2, '0');

    const user = await this.ormRepository.findOne({ where: { id: id_user } });

    if (!user) {
      throw new AppError('User not found');
    }

    const appointments = await this.ormRepository.query(
      `select apo.id, apo.start_date, cou.name as court_name from appointments apo inner join courts cou on apo.id_court = cou.id inner join appointments_users use on apo.id = use.id_appointment where id_user='${id_user}' and apo.start_date >= '${year}-${parsedMonth}-${parsedDay}'::date`,
    );

    const classes = await this.weekClassRepository.query(
      `select claUse.id, weekClass.start_date, cou.name as court_name, tea.name as teacher_name from teachers_week_classes weekClass inner join teachers_classes cla on weekClass.id_class = cla.id inner join courts cou on cla.id_court = cou.id inner join teachers tea on cla.id_teacher = tea.id inner join teachers_week_classes_users claUse on weekClass.id = claUse.id_week inner join users use on claUse.ssn = use.ssn where use.id='${id_user}' and weekClass.start_date >= '${year}-${parsedMonth}-${parsedDay}'::date and claUse.canceled = false`,
    );

    const objectReturn: IReturnUserEventsDTO[] = [];

    appointments.map((appointment: any) => {
      const newObject: IReturnUserEventsDTO = {
        id: appointment.id,
        type: 'Reserva Avulsa',
        date: appointment.start_date,
        court_name: appointment.court_name,
        retrieved: false,
      };
      objectReturn.push(newObject);
      return null;
    });

    classes.map((teacherClass: any) => {
      const newObject: IReturnUserEventsDTO = {
        id: teacherClass.id,
        type: 'Aula',
        date: teacherClass.start_date,
        court_name: teacherClass.court_name,
        teacher_name: teacherClass.teacher_name,
        retrieved: teacherClass.retrieved,
      };
      objectReturn.push(newObject);
      return null;
    });

    return objectReturn;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne({ where: { id } });
    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    console.log(email);
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findBySsn(ssn: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { ssn } });
    return user;
  }

  public async findUserCategoryBySport(
    id_user: string,
    id_sport: string,
  ): Promise<UserCategory> {
    const category = await this.userCategoryRepository.findOne({
      where: { id_user, id_sport },
    });

    if (!category) {
      throw new AppError('Category not found');
    }

    return category;
  }

  public async updateUserCategory(
    data: IUpdateUserCategoryDTO,
  ): Promise<UserCategory> {
    const { id_user, id_sport, id_category } = data;
    const userCategory = await this.userCategoryRepository.findOne({
      where: {
        id_user,
        id_sport,
      },
    });

    if (!userCategory) {
      throw new AppError('User category not found');
    }

    userCategory.id_category = id_category;
    await this.userCategoryRepository.save(userCategory);

    return userCategory;
  }

  public async findAllUserCategories(
    id_user: string,
  ): Promise<IReturnUserCategoriesDTO[]> {
    const usersCategory = await this.userCategoryRepository.query(
      `select use.id, use.id_sport, use.id_category, cat.strength from users_categories use left join sports_categories cat on use.id_category = cat.id where use.id_user = '${id_user}'`,
    );
    return usersCategory;
  }

  public async verifyUserCategory(id_user: string): Promise<UserTypes> {
    const userType = await this.userTypeRepository.query(
      `select id, name from user_types where id in (select user_type from users where id = '${id_user}')`,
    );

    return userType[0];
  }

  public async findAllUserTypes(): Promise<UserTypes[]> {
    const userTypes = await this.userTypeRepository.find();

    return userTypes;
  }

  public async findAllAdminUsers(): Promise<User[]> {
    const users = await this.ormRepository.query(
      `select use.id, use.name, use.one_signal_id, use.cellphone from users use inner join user_types ty on use.user_type = ty.id where ty.name like '%Admin%'`,
    );
    return users;
  }

  public async updateCustomerOneSignalId(
    id_user: string,
    oneSignalId: string,
  ): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: {
        id: id_user,
      },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    user.one_signal_id = oneSignalId;

    await this.ormRepository.save(user);

    return user;
  }

  public async createPasswordCode(
    id_user: string,
    code: string,
  ): Promise<PasswordCode> {
    const passwordCode = await this.passwordCodeRepository.create({
      id_user,
      code,
    });

    await this.passwordCodeRepository.save(passwordCode);

    return passwordCode;
  }

  public async validateLastCode(
    id_user: string,
    code: string,
  ): Promise<boolean> {
    const codes = await this.passwordCodeRepository.find({
      where: { id_user },
      order: { created_at: 'DESC' },
    });
    if (codes[0].code === code) {
      return true;
    }
    return false;
  }

  public async deleteUser(id_user: string): Promise<User> {
    const user = await this.ormRepository.findOne({ where: { id: id_user } });
    if (!user) {
      throw new AppError('User not found');
    }
    await this.ormRepository.remove(user);

    return user;
  }
}
export default UsersRepository;
