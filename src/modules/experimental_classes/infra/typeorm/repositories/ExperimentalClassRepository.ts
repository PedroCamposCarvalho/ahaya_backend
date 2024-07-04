/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getRepository, Repository } from 'typeorm';

import IExperimentalClassRepository from '@modules/experimental_classes/repositories/IExperimentalClassRepository';
import ICreateExperimentalClassDTO from '@modules/experimental_classes/dtos/ICreateExperimentalClassDTO';
import ICreateExperimentalClassUsersDTO from '@modules/experimental_classes/dtos/ICreateExperimentalClassUsersDTO';
import ICreateConfigClassDTO from '@modules/experimental_classes/dtos/ICreateConfigClassDTO';
import IEditConfigClassDTO from '@modules/experimental_classes/dtos/IEditConfigClassDTO';
import ICreateExceptionDayDTO from '@modules/experimental_classes/dtos/ICreateExceptionDayDTO';
import IFindByIdServiceDTO from '@modules/experimental_classes/dtos/IFindByIdServiceDTO';

import { addHours, startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ExperimentalClass from '../entities/ExperimentalClass';
import ExperimentalClassUsers from '../entities/ExperimentalClassUsers';
import ExperimentalClassConfig from '../entities/ExperimentalClassConfig';
import ExperimentalClassException from '../entities/ExperimentalClassException';

class ExperimentalClassRepository implements IExperimentalClassRepository {
  private ormRepository: Repository<ExperimentalClass>;

  private configRepository: Repository<ExperimentalClassConfig>;

  private usersRepository: Repository<ExperimentalClassUsers>;

  private exceptionsRepository: Repository<ExperimentalClassException>;

  constructor() {
    this.ormRepository = getRepository(ExperimentalClass);
    this.configRepository = getRepository(ExperimentalClassConfig);
    this.usersRepository = getRepository(ExperimentalClassUsers);
    this.exceptionsRepository = getRepository(ExperimentalClassException);
  }

  public async create(
    data: ICreateExperimentalClassDTO,
  ): Promise<ExperimentalClass> {
    const formattedDate = startOfHour(data.start_date);
    const finish_date = addHours(formattedDate, 3);
    const experimentalClass = this.ormRepository.create({
      id_place: data.id_place,
      price: data.price,
      limit: data.limit,
      start_date: addHours(formattedDate, -3),
      finish_date,
    });
    await this.ormRepository.save(experimentalClass);
    return experimentalClass;
  }

  public async createByClassesConfig(
    data: ICreateExperimentalClassDTO,
  ): Promise<ExperimentalClass> {
    const experimentalClass = this.ormRepository.create({
      id_place: data.id_place,
      price: data.price,
      limit: data.limit,
      start_date: data.start_date,
      finish_date: data.finish_date,
    });
    await this.ormRepository.save(experimentalClass);
    return experimentalClass;
  }

  public async save(
    experimentalClass: ExperimentalClass,
  ): Promise<ExperimentalClass> {
    return this.ormRepository.save(experimentalClass);
  }

  public async findByDate(date: Date): Promise<ExperimentalClass | undefined> {
    const dateToCompare = addHours(date, -3);
    const findExperimentalClass = await this.ormRepository.findOne({
      where: { start_date: dateToCompare },
    });
    return findExperimentalClass;
  }

  public async createUser(
    data: ICreateExperimentalClassUsersDTO,
  ): Promise<ExperimentalClassUsers> {
    const users = await this.usersRepository.find({
      where: {
        id_experimental_class: data.id_experimental_class,
      },
      order: {
        created_at: 'DESC',
      },
    });

    const user = this.usersRepository.create({
      id_experimental_class: data.id_experimental_class,
      id_user: data.id_user,
      paid: data.paid,
      observation: data.observation,
      paid_price: data.paid_price,
      id_transaction: data.id_transaction,
      material_amount: data.material_amount,
      ticket_number: users.length > 0 ? users[0].ticket_number + 1 : 1,
    });

    await this.usersRepository.save(user);

    return user;
  }

  public async findUsersByList(
    id_experimentalclass: string,
  ): Promise<ExperimentalClassUsers[]> {
    const users = await this.usersRepository.query(
      `select cla.id_experimental_class as id_experimentalclass, use.id as id_user, use.name, cla.paid, cla.observation, cla.id_transaction, cla.paid_price, cla.material_amount from experimental_classes_users cla inner join users use on cla.id_user = use.id where cla.id_experimental_class = '${id_experimentalclass}'`,
    );

    return users;
  }

  public async findByToken(token: string): Promise<ExperimentalClass> {
    const experimentalClass = await this.ormRepository.findOne({
      where: { token },
    });

    if (!experimentalClass) {
      throw new AppError('Token not found');
    }

    return experimentalClass;
  }

  public async findExperimentalClassAvailability(
    id_experimentalclass: string,
  ): Promise<number> {
    const users = await this.usersRepository.find({
      where: { id: id_experimentalclass },
    });

    if (!users) {
      throw new AppError('Users not found');
    }

    return users.length;
  }

  public async deleteUser(
    id_user: string,
    id_experimentalclass: string,
  ): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id_user, id_experimentalclass },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    await this.usersRepository.remove(user);
  }

  public async findAll(
    id_place: string,
    past: boolean,
  ): Promise<ExperimentalClass[]> {
    const today = new Date();
    const year = today.getFullYear();
    const parsedMonth = String(today.getMonth() + 1).padStart(2, '0');
    const parsedDay = String(today.getDate()).padStart(2, '0');

    let query = `select cla.id, cla.price, cla.limit, cla.start_date, cla.finish_date, count(use.id) as users_in_list from experimental_classes cla left join experimental_classes_users use on cla.id = use.id_experimental_class where `;

    if (!past) {
      query += ` cla.start_date >= '${year}-${parsedMonth}-${parsedDay}'::date and `;
    }

    query += `cla.id_place = '${id_place}' group by cla.id, cla.price, cla.limit, cla.start_date, cla.finish_date order by cla.start_date asc`;

    const experimentalClass = await this.ormRepository.query(query);

    return experimentalClass;
  }

  public async findAllByUser(
    id_user: string,
  ): Promise<ExperimentalClassUsers[]> {
    const experimentalClass = await this.usersRepository.query(
      `select use.id, use.id_experimental_class, cla.id_place, use.id_transaction,use.paid, use.ticket_number, use.paid_price, use.material_amount, use.created_at, cla.start_date, cla.finish_date from experimental_classes_users use inner join experimental_classes cla on use.id_experimental_class = cla.id where use.id_user = '${id_user}'`,
    );

    return experimentalClass;
  }

  public async verifyUserIsInList(
    id_experimentalclass: string,
    id_user: string,
  ): Promise<boolean> {
    const experimentalClass = await this.usersRepository.find({
      where: { id_experimentalclass, id_user },
    });
    if (experimentalClass.length) {
      return true;
    }
    return false;
  }

  public async findById(
    id_experimentalclass: string,
  ): Promise<IFindByIdServiceDTO> {
    const experimentalClass = await this.ormRepository.query(
      `select cla.start_date, pla.name, cla.id_place from experimental_classes cla inner join places pla on cla.id_place = pla.id where cla.id = '${id_experimentalclass}'`,
    );
    return experimentalClass[0];
  }

  public async findByIdPlace(id_place: string): Promise<ExperimentalClass> {
    const placesId = await this.ormRepository.find();

    return placesId[0];
  }

  public async createConfigClass(
    data: ICreateConfigClassDTO,
  ): Promise<ExperimentalClassConfig> {
    const experimentalClass = this.configRepository.create({
      id_place: data.id_place,
      price: data.price,
      limit: data.limit,
      week_number: data.week_day,
      hour: data.hour,
      minutes: data.minutes,
    });
    await this.configRepository.save(experimentalClass);
    return experimentalClass;
  }

  public async findAllConfigDays(): Promise<ExperimentalClassConfig[]> {
    const classes = await this.configRepository.find();

    return classes;
  }

  public async findCreatedClasses(): Promise<ExperimentalClass[]> {
    const classes = await this.ormRepository.find();
    return classes;
  }

  public async deleteConfigClass(id_class: string): Promise<boolean> {
    const experimentalClass = await this.configRepository.findOne({
      where: { id: id_class },
    });
    if (!experimentalClass) {
      throw new AppError('Class not found');
    }
    await this.configRepository.remove(experimentalClass);

    return true;
  }

  public async editConfigClass(
    data: IEditConfigClassDTO,
  ): Promise<ExperimentalClassConfig> {
    const experimentalClass = await this.configRepository.findOne({
      where: { id: data.id },
    });
    if (!experimentalClass) {
      throw new AppError('Class not found');
    }
    experimentalClass.limit = data.limit;
    experimentalClass.hour = data.hour;
    experimentalClass.minutes = data.minutes;
    experimentalClass.price = data.price;
    experimentalClass.week_number = data.week_day;
    await this.configRepository.save(experimentalClass);

    return experimentalClass;
  }

  public async findAllUnpaidUsers(): Promise<ExperimentalClassUsers[]> {
    const users = await this.usersRepository.find({ where: { paid: false } });

    return users;
  }

  public async updatePaidUser(
    id_experimentalclass_user: string,
  ): Promise<ExperimentalClassUsers> {
    const user = await this.usersRepository.findOne({
      where: { id: id_experimentalclass_user },
    });
    if (!user) {
      throw new AppError('User not found');
    }
    user.paid = true;
    await this.usersRepository.save(user);
    return user;
  }

  public async deleteClass(id_class: string): Promise<ExperimentalClass> {
    const experimentalClass = await this.ormRepository.findOne({
      where: { id: id_class },
    });
    if (!experimentalClass) {
      throw new AppError('Experimental Class not found');
    }
    await this.ormRepository.remove(experimentalClass);
    return experimentalClass;
  }

  public async findExceptionsByPlace(
    id_place: string,
  ): Promise<ExperimentalClassException[]> {
    const exceptionsDays = await this.exceptionsRepository.find({
      where: {
        id_place,
      },
    });
    return exceptionsDays;
  }

  public async createExceptionDay(
    data: ICreateExceptionDayDTO,
  ): Promise<ExperimentalClassException> {
    const exceptionDay = await this.exceptionsRepository.create(data);
    await this.exceptionsRepository.save(exceptionDay);
    return exceptionDay;
  }

  public async deleteExceptionDay(
    id_exceptionDay: string,
  ): Promise<ExperimentalClassException> {
    const exceptionDay = await this.exceptionsRepository.findOne({
      where: { id: id_exceptionDay },
    });

    if (!exceptionDay) {
      throw new AppError('Exception day not found');
    }

    await this.exceptionsRepository.remove(exceptionDay);

    return exceptionDay;
  }

  public async findAllExceptions(): Promise<ExperimentalClassException[]> {
    const exceptions = await this.exceptionsRepository.find();
    return exceptions;
  }
}
export default ExperimentalClassRepository;
