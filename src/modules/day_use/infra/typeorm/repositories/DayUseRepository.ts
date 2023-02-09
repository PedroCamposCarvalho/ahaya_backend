/* eslint-disable no-loop-func */
import { getRepository, Repository } from 'typeorm';

import IDayUseRepository from '@modules/day_use/repositories/IDayUseRepository';
import ICreateDayUseDTO from '@modules/day_use/dtos/ICreateDayUseDTO';
import ICreateDayUseUsersDTO from '@modules/day_use/dtos/ICreateDayUseUsersDTO';
import IReturnWebReportDTO from '@modules/day_use/dtos/IReturnWebReportDTO';

import { addHours, startOfHour, parseISO } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/places/infra/typeorm/entities/Appointments/Appointment';
import DayUse from '../entities/DayUse';
import DayUseUsers from '../entities/DayUseUsers';
import DayUseCourts from '../entities/DayUseCourts';

class DayUseRepository implements IDayUseRepository {
  private ormRepository: Repository<DayUse>;

  private usersRepository: Repository<DayUseUsers>;

  private dayUseCourtsRepository: Repository<DayUseCourts>;

  private appointmentsRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(DayUse);
    this.usersRepository = getRepository(DayUseUsers);
    this.dayUseCourtsRepository = getRepository(DayUseCourts);
    this.appointmentsRepository = getRepository(Appointment);
  }

  public async create(data: ICreateDayUseDTO): Promise<DayUse> {
    const formattedStartDate = startOfHour(parseISO(String(data.start_date)));
    const formattedFinishDate = startOfHour(parseISO(String(data.finish_date)));
    const dayUse = this.ormRepository.create({
      price: data.price,
      limit: data.limit,
      start_date: addHours(formattedStartDate, -3),
      finish_date: addHours(formattedFinishDate, -3),
      id_place: data.id_place,
    });
    await this.ormRepository.save(dayUse);
    // const finish_date = addHours(data.start_date, 1);

    data.courts.map(async court => {
      const appointment = this.appointmentsRepository.create({
        id_court: court,
        price: 0,
        start_date: formattedStartDate,
        finish_date: formattedFinishDate,
        canceled: false,
        created_sequence: false,
        id_transaction: '',
        observation: dayUse.id,
        id_place: data.id_place,
      });
      await this.appointmentsRepository.save(appointment);
    });

    data.courts.map(async court => {
      const dayUseCourt = this.dayUseCourtsRepository.create({
        id_dayuse: dayUse.id,
        id_court: court,
      });

      await this.dayUseCourtsRepository.save(dayUseCourt);
    });

    return dayUse;
  }

  public async save(dayUse: DayUse): Promise<DayUse> {
    return this.ormRepository.save(dayUse);
  }

  public async findByDate(date: Date): Promise<DayUse | undefined> {
    const dateToCompare = addHours(date, -3);
    const findDayUse = await this.ormRepository.findOne({
      where: { start_date: dateToCompare },
    });
    return findDayUse;
  }

  public async createUser(data: ICreateDayUseUsersDTO): Promise<DayUseUsers> {
    const users = await this.usersRepository.find({
      where: {
        id_dayuse: data.id_dayuse,
      },
      order: {
        created_at: 'DESC',
      },
    });

    const user = this.usersRepository.create({
      id_dayuse: data.id_dayuse,
      id_user: data.id_user,
      paid: true,
      observation: data.observation,
      paid_price: data.paid_price,
      id_transaction: data.id_transaction,
      material_amount: data.material_amount,
      ticket_number: users.length > 0 ? users[0].ticket_number + 1 : 1,
    });

    await this.usersRepository.save(user);

    return user;
  }

  public async findUsersByList(id_dayuse: string): Promise<DayUseUsers[]> {
    const users = await this.usersRepository.query(
      `select use.name, use.id as id_user,day.paid, day.observation, day.id_transaction, day.paid_price, day.material_amount ,count(day.ticket_number) as tickets, count(CASE WHEN day.retrieved > 0 THEN 1 END) as tickets_retrieved  from day_use_users day inner join users use on day.id_user = use.id where day.id_dayuse = '${id_dayuse}' group by  use.name, use.id, day.paid, day.observation, day.id_transaction, day.paid_price,  day.material_amount`,
    );

    return users;
  }

  public async findByToken(token: string): Promise<DayUse> {
    const dayUse = await this.ormRepository.findOne({
      where: { token },
    });

    if (!dayUse) {
      throw new AppError('Token not found');
    }

    return dayUse;
  }

  public async findDayUseAvailability(id_dayuse: string): Promise<number> {
    const users = await this.usersRepository.find({ where: { id_dayuse } });

    if (!users) {
      throw new AppError('Users not found');
    }

    return users.length;
  }

  public async deleteUser(id_user: string, id_dayuse: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id_user, id_dayuse },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    await this.usersRepository.remove(user);
  }

  public async findAll(limit: number, past: boolean): Promise<DayUse[]> {
    const today = new Date();
    const year = today.getFullYear();
    const parsedMonth = String(today.getMonth() + 1).padStart(2, '0');
    const parsedDay = String(today.getDate()).padStart(2, '0');

    let query = `select day.id, day.price, pla.name as place_name, day.limit, day.start_date  + interval '3 hour' as start_date, day.finish_date + interval '3 hour' as finish_date,  day.special_thumbnail, day.special_image,count(use.id) as users_in_list from day_use day  left join day_use_users use on day.id = use.id_dayuse inner join places pla on day.id_place = pla.id `;
    if (!past) {
      query += ` where day.start_date >= '${year}-${parsedMonth}-${parsedDay}'::date `;
    }

    query += `group by day.id, day.price, day.limit, day.start_date, day.finish_date, pla.id order by day.start_date asc`;

    const dayuse = await this.ormRepository.query(query);

    return dayuse;
  }

  public async findAllByUser(id_user: string): Promise<DayUseUsers[]> {
    const dayuse = await this.usersRepository.query(
      `select use.id, pla.name as place_name, use.id_dayuse, use.id_transaction,use.paid, use.paid_price, use.material_amount, use.created_at, day.start_date, day.finish_date, use.ticket_number, use.retrieved from day_use_users use inner join day_use day on use.id_dayuse = day.id inner join places pla on day.id_place = pla.id where use.id_user = '${id_user}' and use.paid = true order by created_at asc`,
    );

    return dayuse;
  }

  public async verifyUserIsInList(
    id_dayuse: string,
    id_user: string,
  ): Promise<boolean> {
    const dayuse = await this.usersRepository.find({
      where: { id_dayuse, id_user },
    });
    if (dayuse.length) {
      return true;
    }
    return false;
  }

  public async retrieveTicket(id_ticket: string): Promise<DayUseUsers> {
    const dayUseUser = await this.usersRepository.findOne({
      where: {
        id: id_ticket,
      },
    });

    if (!dayUseUser) {
      throw new AppError('User not found');
    }

    dayUseUser.retrieved = 1;

    await this.usersRepository.save(dayUseUser);

    return dayUseUser;
  }

  public async findTicket(id_ticket: string): Promise<DayUseUsers> {
    const dayUseUser = await this.usersRepository.findOne({
      where: {
        id: id_ticket,
      },
    });

    if (!dayUseUser) {
      throw new AppError('User not found');
    }

    return dayUseUser;
  }

  public async deleteDayUse(id_dayuse: string): Promise<DayUse> {
    const dayUse = await this.ormRepository.findOne({
      where: {
        id: id_dayuse,
      },
    });

    if (!dayUse) {
      throw new AppError('Day Use not found');
    }

    await this.ormRepository.remove(dayUse);

    const appointments = await this.appointmentsRepository.find({
      where: { observation: id_dayuse },
    });

    await this.appointmentsRepository.remove(appointments);

    return dayUse;
  }

  public async findDayUseCourts(id_dayuse: string): Promise<DayUseCourts> {
    const dayUseCourts = await this.dayUseCourtsRepository.query(
      `select day.id, cou.name from day_use_courts day inner join courts cou on day.id_court = cou.id where day.id_dayuse = '${id_dayuse}'`,
    );

    return dayUseCourts;
  }

  public async findAllUsersInMonth(
    month: number,
    year: number,
    id_place: string,
  ): Promise<IReturnWebReportDTO[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const dayUseUsers = await this.usersRepository.query(
      `select use.id, use.observation, day.start_date, use.paid_price from day_use_users use inner join day_use day on use.id_dayuse = day.id where extract(month from day.start_date) = ${parsedMonth} and extract(year from day.start_date) = ${year}`,
    );

    return dayUseUsers;
  }

  public async updateDayUse(data: DayUse): Promise<DayUse> {
    const dayUse = await this.ormRepository.findOne({ where: { id: data.id } });

    if (!dayUse) {
      throw new AppError('Day Use not found');
    }

    dayUse.limit = data.limit;
    dayUse.price = data.price;
    dayUse.start_date = data.start_date;
    dayUse.finish_date = data.finish_date;

    await this.ormRepository.save(dayUse);

    return dayUse;
  }

  public async findAllUnpaidUsers(): Promise<DayUseUsers[]> {
    const users = await this.usersRepository.find({ where: { paid: false } });

    return users;
  }

  public async updatePaidUser(id_dayuseuser: string): Promise<DayUseUsers> {
    const dayUseUser = await this.usersRepository.findOne({
      where: { id: id_dayuseuser },
    });
    if (!dayUseUser) {
      throw new AppError('User not found');
    }
    dayUseUser.paid = true;
    await this.usersRepository.save(dayUseUser);
    return dayUseUser;
  }
}
export default DayUseRepository;
