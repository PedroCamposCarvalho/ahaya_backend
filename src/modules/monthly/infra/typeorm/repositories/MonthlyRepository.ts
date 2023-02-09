import { getRepository, Repository } from 'typeorm';
import { addDays } from 'date-fns';

import IReturnFindAllDTO from '@modules/monthly/dtos/IReturnFindAllDTO';
import ICreateMonthlyDayDTO from '@modules/monthly/dtos/ICreateMonthlyDayDTO';
import ICreateMonthlyUserDTO from '@modules/monthly/dtos/ICreateMonthlyUserDTO';
import IReturnAdminFindAllDTO from '@modules/monthly/dtos/IReturnAdminFindAllDTO';
import IFindAppAgendaDTO from '@modules/monthly/dtos/IFindAppAgendaDTO';
import ICreateMonthlyUserOnWebSystemDTO from '@modules/monthly/dtos/ICreateMonthlyUserOnWebSystemDTO';
import IReturnMonthlysForAppAgendaDTO from '@modules/monthly/dtos/IReturnMonthlysForAppAgendaDTO';
import IMonthlyRepository from '@modules/monthly/repositories/IMonthlyRepository';

import Court from '@modules/places/infra/typeorm/entities/Courts/Court';

import AppError from '@shared/errors/AppError';
import Monthly from '../entities/Monthly';
import MonthlyCreditCard from '../entities/MonthlyCreditCard';

class MonthlyRepository implements IMonthlyRepository {
  private ormRepository: Repository<Monthly>;

  private creditCardRepository: Repository<MonthlyCreditCard>;

  private courtsRepository: Repository<Court>;

  constructor() {
    this.ormRepository = getRepository(Monthly);
    this.creditCardRepository = getRepository(MonthlyCreditCard);
    this.courtsRepository = getRepository(Court);
  }

  public async findAllAvailableDays(): Promise<IReturnFindAllDTO[]> {
    const days = await this.ormRepository.query(
      'select mont.id, mont.id_court, cou.name as court_name, mont.week_day, mont.hour, mont.price, mont.sandbox_product, mont.production_product mont.start_date from monthly mont inner join courts cou on mont.id_court = cou.id where mont.id_user is null',
    );

    return days;
  }

  public async createMonthlyHour(data: ICreateMonthlyDayDTO): Promise<Monthly> {
    const monthly = await this.ormRepository.create(data);
    await this.ormRepository.save(monthly);
    return monthly;
  }

  public async findAvailableCourtsForHour(
    dayOfWeek: number,
    hour: number,
  ): Promise<Court[]> {
    const courts = await this.ormRepository.query(
      `select * from courts where id not in (select id_court from monthly where week_day = ${dayOfWeek} and hour = ${hour})`,
    );

    return courts;
  }

  public async findAvailableCourtsByHours(
    dayOfWeek: number,
    hours: number[],
  ): Promise<Court[]> {
    const courts = await this.ormRepository.query(
      `select * from courts where id in (select id_court from monthly where week_day = ${dayOfWeek} and hour = ANY(ARRAY[${hours}]) and id_user is null)`,
    );

    return courts;
  }

  public async findMonthlyHours(
    dayOfWeek: number,
    id_court: string,
  ): Promise<Monthly[]> {
    const query = this.ormRepository.createQueryBuilder('monthly');

    query.orderBy('hour', 'ASC');

    query.where('monthly.week_day = :week_day', { week_day: dayOfWeek });

    if (id_court > '') {
      query.andWhere(`monthly.id_court = '${id_court}'`);
    }

    const monthly = await query.getMany();

    return monthly;
  }

  public async createMonthlyUser(
    data: ICreateMonthlyUserDTO,
  ): Promise<Monthly> {
    const {
      id_user,
      id_monthly,
      flag,
      last_digits,
      payment_profile,
      start_date,
    } = data;

    const monthly = await this.ormRepository.findOne({
      where: { id: id_monthly },
    });

    if (!monthly) {
      throw new AppError('Monthly not found');
    }

    monthly.id_user = id_user;
    monthly.renew_date = addDays(new Date(), 30);
    monthly.start_date = start_date;

    await this.ormRepository.save(monthly);

    const creditCard = this.creditCardRepository.create({
      id_monthly,
      flag,
      last_digits,
      payment_profile,
    });

    await this.creditCardRepository.save(creditCard);

    return monthly;
  }

  public async findUserMonthly(id_user: string): Promise<Monthly[]> {
    const monthly = await this.ormRepository.find({ where: { id_user } });
    return monthly;
  }

  public async findAdminAll(
    dayOfWeek: number,
    id_court: string,
  ): Promise<IReturnAdminFindAllDTO[]> {
    if (id_court === '') {
      const monthly = await this.ormRepository.query(
        `select mon.id, mon.id_user, mon.id_court, use.name as user_name, mon.week_day as day_of_week, mon.hour, mon.renew_date from monthly mon left join users use on mon.id_user = use.id where mon.week_day = ${dayOfWeek}`,
      );

      return monthly;
    }
    const monthly = await this.ormRepository.query(
      `select mon.id, mon.id_user, mon.id_court, use.name as user_name, mon.week_day as day_of_week, mon.hour, mon.renew_date from monthly mon left join users use on mon.id_user = use.id where mon.id_court='${id_court}' and mon.week_day = ${dayOfWeek}`,
    );

    return monthly;
  }

  public async findBlockedHours(
    dayOfWeek: number,
    hour: number,
  ): Promise<Monthly[]> {
    const monthly = await this.ormRepository.query(
      `select id, id_user, id_court, hour, week_day from monthly where week_day = ${dayOfWeek} and hour=${hour} and id_user is not null`,
    );

    return monthly;
  }

  public async findAll(): Promise<IReturnAdminFindAllDTO[]> {
    const monthly = await this.ormRepository.query(
      `select mon.id, mon.id_user,  mon.id_court, use.name as user_name, mon.week_day as day_of_week, mon.hour, mon.renew_date, mon.created_at, mon.start_date from monthly mon left join users use on mon.id_user = use.id where mon.id_user is not null`,
    );

    return monthly;
  }

  public async createMonthlyUserOnWebSystem(
    data: ICreateMonthlyUserOnWebSystemDTO,
  ): Promise<boolean> {
    const { hours, id_court, week_day, id_user } = data;

    try {
      hours.map(async hour => {
        const monthly = await this.ormRepository.findOne({
          where: { hour, id_court, week_day },
        });
        if (!monthly) {
          throw new AppError('Monthly not found');
        }
        monthly.id_user = id_user;
        await this.ormRepository.save(monthly);
      });
    } catch (error) {
      throw new Error();
    }

    return true;
  }

  public async findAllByWeekDay(dayOfWeek: number): Promise<Monthly[]> {
    const monthly = await this.ormRepository.find({
      where: { week_day: dayOfWeek },
    });

    return monthly;
  }

  public async removeMonthly(id_monthly: string): Promise<Monthly> {
    const monthly = await this.ormRepository.findOne({
      where: { id: id_monthly },
    });

    if (!monthly) {
      throw new AppError('Monthly not found');
    }
    await this.ormRepository.query(
      `update monthly set id_user = null where id = '${id_monthly}'`,
    );

    return monthly;
  }

  public async findMonthlysForAppAgenda(
    data: IFindAppAgendaDTO,
  ): Promise<IReturnMonthlysForAppAgendaDTO[]> {
    const { day, month, year } = data;

    const week_day = new Date(year, month - 1, day).getDay();

    const monthly = await this.ormRepository.query(
      `select mon.id, use.name as observation, cou.name as court_name, mon.hour from monthly mon inner join users use on mon.id_user = use.id inner join courts cou on mon.id_court = cou.id where mon.week_day = ${week_day}`,
    );

    return monthly;
  }
}
export default MonthlyRepository;
