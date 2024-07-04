import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/places/repositories/Appointments/IAppointmentsRepository';
import IFindAllInDayDTO from '@modules/places/dtos/Appointments/IFindAllInDayDTO';
import IScheduleNotificationDTO from '@modules/places/dtos/Appointments/IScheduleNotificationDTO';
import IFindUserHistoryFiltersDTO from '@modules/places/dtos/Appointments/IFindUserHistoryFiltersDTO';
import IFindAppointmentsMaterialsDTO from '@modules/places/dtos/Appointments/IFindAppointmentsMaterialsDTO';
import IReturnAgendaDTO from '@modules/places/dtos/Appointments/IReturnAgendaDTO';
import {
  IAppointmentProps,
  IHoursProps,
  IAppointmentMaterialsProps,
} from '@modules/places/dtos/Appointments/ICreateAppointmentDTO';
import IReturnAgendaAppointmentDTO from '@modules/places/dtos/Appointments/IReturnAgendaAppointmentDTO';
import ICreatePriceDTO from '@modules/places/dtos/Appointments/ICreatePriceDTO';
import IEditPriceDTO from '@modules/places/dtos/Appointments/IEditPriceDTO';
import ICreatePriceExceptionDTO from '@modules/places/dtos/Appointments/ICreatePriceExceptionDTO';
import IReturnExceptionsForPriceDTO from '@modules/places/dtos/Appointments/IReturnExceptionsForPriceDTO';
import IEditAppointmentDTO from '@modules/places/dtos/Appointments/IEditAppointmentDTO';

import AppError from '@shared/errors/AppError';
import Appointment from '../../entities/Appointments/Appointment';
import AppointmentMaterials from '../../entities/Appointments/AppointmentMaterials';
import AppointmentUsers from '../../entities/Appointments/AppointmentUsers';
import AppointmentPrice from '../../entities/Appointments/AppointmentPrice';
import AppointmentsPricesExceptions from '../../entities/Appointments/AppointmentsPricesExceptions';

class Appointments implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  private materialsRepository: Repository<AppointmentMaterials>;

  private usersRepository: Repository<AppointmentUsers>;

  private pricesRepository: Repository<AppointmentPrice>;

  private pricesExceptionRepository: Repository<AppointmentsPricesExceptions>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
    this.materialsRepository = getRepository(AppointmentMaterials);
    this.usersRepository = getRepository(AppointmentUsers);
    this.pricesRepository = getRepository(AppointmentPrice);
    this.pricesExceptionRepository = getRepository(
      AppointmentsPricesExceptions,
    );
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.ormRepository.save(appointment);
  }

  public async findById(id_appointment: string): Promise<Appointment> {
    const query = this.ormRepository.createQueryBuilder('apo');

    query.select('apo.id', 'id');
    query.addSelect('apo.price', 'price');
    query.addSelect('apo.start_date', 'start_date');
    query.addSelect('apo.finish_date', 'finish_date');
    query.addSelect('apo.canceled', 'canceled');
    query.addSelect('apo.created_at', 'created_at');
    query.addSelect('apo.updated_at', 'updated_at');
    query.addSelect('apo.created_sequence', 'created_sequence');
    query.addSelect('apo.id_transaction', 'id_transaction');
    query.addSelect('apo.observation', 'observation');
    query.addSelect('apo.number_of_players', 'number_of_players');
    query.leftJoin(
      'appointments_users',
      'apo_user',
      'apo.id = apo_user.id_appointment',
    );
    query.addSelect('apo_user.id_user', 'id_user');
    query.leftJoin('users', 'use', 'apo_user.id_user = use.id');
    query.addSelect('use.cellphone', 'cellphone');

    query.innerJoin('courts', 'cou', 'apo.id_court = cou.id');
    query.addSelect('cou.id', 'id_court');
    query.addSelect('cou.name', 'court_name');

    query.where(`apo.id = '${id_appointment}'`);

    const appointment = await query.execute();
    return appointment[0];
  }

  public async findAllInDayToNotify({
    day,
    month,
    year,
  }: IFindAllInDayDTO): Promise<IScheduleNotificationDTO[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const query = `select use.one_signal_id, apo.start_date from appointments apo inner join appointments_users apouse on apo.id = apouse.id_appointment inner join users use on apouse.id_user = use.id where apo.start_date::date = '${`${year}-${parsedMonth}-${parsedDay}`}' order by apo.start_date asc`;

    const appointments = await this.ormRepository.query(query);

    return appointments;
  }

  public async deleteAppointment(id_appointment: string): Promise<boolean> {
    const appointment = await this.ormRepository.findOne({
      where: {
        id: id_appointment,
      },
    });

    if (!appointment) {
      throw new AppError('Reserva não encontrada');
    }

    appointment.canceled = true;

    await this.ormRepository.remove(appointment);

    return true;
  }

  public async findMonthlyAppointments(
    id_appointment: string,
  ): Promise<Appointment[]> {
    const appointment = await this.ormRepository.findOne({
      where: {
        id: id_appointment,
      },
    });

    if (!appointment) {
      throw new AppError('Reserva não encontrada!');
    }

    const userAppointments = await this.ormRepository.query(
      `select * from appointments where observation='${
        appointment.observation
      }' and EXTRACT(ISODOW FROM start_date) IN (${new Date(
        appointment.start_date,
      ).getDay()}) `,
    );

    return userAppointments;
  }

  public async findAppointmentForAgenda(
    id_appointment: string,
  ): Promise<IReturnAgendaAppointmentDTO> {
    const appointments = await this.ormRepository.query(
      `select apo.id, apo.price, apo.observation, apo.start_date, use.cellphone, cou.name as court_name, apo.created_at, spo.name as sport_name from appointments apo inner join courts cou on apo.id_court = cou.id inner join appointments_users apouser on apo.id = apouser.id_appointment inner join appointments_materials mat on mat.id_appointment = apo.id inner join materials on materials.id = mat.id_material inner join sports spo on materials.sport_id = spo.id inner join users use on use.id = apouser.id_user where apo.id = '${id_appointment}'`,
    );

    return appointments[0];
  }

  public async findAllInDay({
    day,
    month,
    year,
    id_place,
  }: IFindAllInDayDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.query(
      `select apo.id, apo.price, apo.observation, apo.id_court, apo.start_date, apo.finish_date, apo.canceled, apo.created_at, apo.updated_at, cou.name as court_name from appointments apo inner join courts cou on apo.id_court = cou.id where apo.start_date::date = '${`${year}-${parsedMonth}-${parsedDay}`}' order by apo.start_date asc`,
    );

    return appointments;
  }

  public async findAll(): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      order: { start_date: 'ASC' },
    });
    return appointments;
  }

  public async createAppointmentHour(
    hour: IHoursProps,
    appointment: IAppointmentProps,
  ): Promise<Appointment> {
    const { finalPrice, id_place, paid } = appointment;

    const newAppointment = await this.ormRepository.create({
      id_court: hour.id_court,
      id_place,
      price: finalPrice,
      start_date: hour.start_date,
      finish_date: hour.finish_date,
      canceled: false,
      created_sequence: false,
      id_transaction: appointment.id_transaction,
      observation:
        finalPrice > 0
          ? `${appointment.user_name} - App`
          : appointment.user_name,
      number_of_players: hour.number_of_players,
      paid,
    });

    await this.ormRepository.save(newAppointment);

    return newAppointment;
  }

  public async createAppointmentUser(
    id_appointment: string,
    id_user: string,
  ): Promise<AppointmentUsers> {
    const appointmentUser = await this.usersRepository.create({
      id_appointment,
      id_user,
    });
    await this.usersRepository.save(appointmentUser);
    return appointmentUser;
  }

  public async createAppointmentMaterial(
    materials: IAppointmentMaterialsProps,
    id_appointment: string,
  ): Promise<AppointmentMaterials> {
    const { id, amount } = materials;
    const newAppointmentMaterial = await this.materialsRepository.create({
      id_appointment,
      id_material: id,
      amount,
    });

    await this.materialsRepository.save(newAppointmentMaterial);

    return newAppointmentMaterial;
  }

  public async findUserHistory(
    data: IFindUserHistoryFiltersDTO,
  ): Promise<Appointment[]> {
    const { id_user, month, year } = data;
    const query = this.ormRepository.createQueryBuilder('appointment');

    query.select('appointment.id', 'id');
    query.addSelect('appointment.start_date', 'start_date');
    query.addSelect('appointment.finish_date', 'finish_date');
    query.addSelect('appointment.observation', 'observation');
    query.addSelect('appointment.created_at', 'created_at');
    query.addSelect('appointment.id_place', 'id_place');
    query.addSelect('appointment.number_of_players', 'number_of_players');
    query.addSelect('court.name', 'court_name');
    query.innerJoin(
      'appointments_users',
      'users',
      'appointment.id = users.id_appointment',
    );

    query.innerJoin('courts', 'court', 'appointment.id_court = court.id');

    query.andWhere('users.id_user = :id_user', { id_user });

    query.andWhere(`extract(year from appointment.start_date) = :year`, {
      year,
    });

    if (month) {
      query.andWhere(`extract(month from appointment.start_date) = :month`, {
        month,
      });
    }

    query.orderBy('appointment.created_at', 'DESC');
    const appointments = await query.execute();
    return appointments;
  }

  public async findAppointmentMaterials(
    id_appointment: string,
  ): Promise<IFindAppointmentsMaterialsDTO[]> {
    const materials = await this.materialsRepository.query(
      `select mat.id, mat.material, apo.amount from materials mat inner join appointments_materials apo on mat.id = apo.id_material where apo.id_appointment = '${id_appointment}'`,
    );

    return materials;
  }

  public async findAllInDayForAgenda({
    day,
    month,
    year,
    id_place,
  }: IFindAllInDayDTO): Promise<IReturnAgendaDTO[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    let query = `select apo.id, extract(hour from apo.start_date) as hour, extract(hour from apo.finish_date) as finish_hour, cou.name as court_name, apo.observation from appointments apo inner join courts cou on apo.id_court = cou.id where apo.start_date::date = '${`${year}-${parsedMonth}-${parsedDay}`}'`;

    if (id_place) {
      query += ` and apo.id_place = '${id_place}'`;
    }

    query += ` order by cou.updated_at asc`;

    const appointments = await this.ormRepository.query(query);

    return appointments;
  }

  public async findByMonthYearPlace(
    month: number,
    year: number,
    id_place: string,
  ): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.query(
      `select * from appointments where extract(month from start_date) = ${parsedMonth} and extract(year from start_date) = ${year} and id_place = '${id_place}' and price > 0`,
    );

    return appointments;
  }

  public async findAllUnpaidAppointments(): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: { paid: false },
    });
    return appointments;
  }

  public async updatePaidAppointment(
    id_appointment: string,
  ): Promise<Appointment> {
    const appointment = await this.ormRepository.findOne({
      where: { id: id_appointment },
    });
    if (!appointment) {
      throw new AppError('Appointment not found');
    }
    appointment.paid = true;

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAllPrices(): Promise<AppointmentPrice[]> {
    const prices = await this.pricesRepository.find();

    return prices;
  }

  public async findAllInMonth(month: number): Promise<Appointment[]> {
    const appointments = await this.ormRepository.query(
      `select id, id_court, start_date, finish_date from appointments where extract(month from start_date) = ${month}`,
    );
    return appointments;
  }

  public async findPricesByCourt(
    id_court: string,
  ): Promise<AppointmentPrice[]> {
    const prices = await this.pricesRepository.find({ where: { id_court } });

    return prices;
  }

  public async createPrice(data: ICreatePriceDTO): Promise<AppointmentPrice> {
    const price = await this.pricesRepository.create(data);
    await this.pricesRepository.save(price);
    return price;
  }

  public async editPrice(data: IEditPriceDTO): Promise<AppointmentPrice> {
    const { id, price } = data;
    const existingPrice = await this.pricesRepository.findOne({
      where: {
        id,
      },
    });
    if (!existingPrice) {
      throw new AppError('Price not found');
    }
    existingPrice.price = price;

    await this.pricesRepository.save(existingPrice);

    return existingPrice;
  }

  public async deletePrice(id: string): Promise<AppointmentPrice> {
    const price = await this.pricesRepository.findOne({ where: { id } });
    if (!price) {
      throw new AppError('Price not found');
    }
    await this.pricesRepository.remove(price);

    return price;
  }

  public async clearPrice(id_court: string): Promise<void> {
    const prices = await this.pricesRepository.find({ where: { id_court } });
    await this.pricesRepository.remove(prices);
  }

  public async createPriceException(
    data: ICreatePriceExceptionDTO,
  ): Promise<AppointmentsPricesExceptions> {
    const priceException = await this.pricesExceptionRepository.create(data);
    await this.pricesExceptionRepository.save(priceException);
    return priceException;
  }

  public async findAllExceptionsByCourt(
    id_court: string,
  ): Promise<AppointmentsPricesExceptions[]> {
    const query =
      this.pricesExceptionRepository.createQueryBuilder('exception');

    query.select('exception.id', 'id');
    query.addSelect('exception.id_appointment_price', 'id_appointment_price');
    query.addSelect('exception.date', 'date');
    query.addSelect('exception.new_price', 'new_price');
    query.addSelect('exception.created_at', 'created_at');
    query.addSelect('exception.updated_at', 'updated_at');
    query.innerJoin(
      'appointments_prices',
      'apo_price',
      'exception.id_appointment_price = apo_price.id',
    );

    query.where(`apo_price.id_court = '${id_court}'`);

    const priceExceptions = await query.execute();
    return priceExceptions;
  }

  public async deletePriceException(
    id: string,
  ): Promise<AppointmentsPricesExceptions> {
    const priceException = await this.pricesExceptionRepository.findOne({
      where: { id },
    });
    if (!priceException) {
      throw new AppError('Exception not found');
    }
    await this.pricesExceptionRepository.remove(priceException);
    return priceException;
  }

  public async editAppointment(
    data: IEditAppointmentDTO,
  ): Promise<Appointment> {
    const {
      id,
      id_court,
      start_date,
      finish_date,
      price,
      observation,
      number_of_players,
    } = data;
    const appointment = await this.ormRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new AppError('Appointment not found');
    }

    appointment.id_court = id_court;
    appointment.start_date = start_date;
    appointment.finish_date = finish_date;
    appointment.price = price;
    appointment.observation = observation;
    appointment.number_of_players = number_of_players;

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findExceptionsByWeekDay(
    week_day: number,
  ): Promise<IReturnExceptionsForPriceDTO[]> {
    const query =
      this.pricesExceptionRepository.createQueryBuilder('exception');

    query.select('exception.id', 'id');
    query.addSelect('exception.id_appointment_price', 'id_appointment_price');
    query.addSelect('exception.date', 'date');
    query.addSelect('exception.new_price', 'new_price');
    query.addSelect('exception.created_at', 'created_at');
    query.addSelect('exception.updated_at', 'updated_at');
    query.innerJoin(
      'appointments_prices',
      'apo_price',
      'exception.id_appointment_price = apo_price.id',
    );
    query.addSelect('apo_price.week_day', 'week_day');
    query.addSelect('apo_price.hour', 'hour');
    query.addSelect('apo_price.id_court', 'id_court');
    query.where(`apo_price.week_day = ${week_day}`);

    const priceExceptions = await query.execute();
    return priceExceptions;
  }
}
export default Appointments;
