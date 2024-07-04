/* eslint-disable no-loop-func */
import { getRepository, Repository } from 'typeorm';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';
import ICreateEventUserDTO from '@modules/events/dtos/ICreateEventUserDTO';

import { addHours, startOfHour, parseISO } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/places/infra/typeorm/entities/Appointments/Appointment';
import Event from '../entities/Event';
import EventUser from '../entities/EventUser';
import EventCourt from '../entities/EventCourt';

class EventsRepository implements IEventsRepository {
  private ormRepository: Repository<Event>;

  private usersRepository: Repository<EventUser>;

  private eventsCourtsRepository: Repository<EventCourt>;

  private appointmentsRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Event);
    this.usersRepository = getRepository(EventUser);
    this.eventsCourtsRepository = getRepository(EventCourt);
    this.appointmentsRepository = getRepository(Appointment);
  }

  public async create(data: ICreateEventDTO): Promise<Event> {
    const formattedStartDate = startOfHour(parseISO(String(data.start_date)));
    const formattedFinishDate = startOfHour(parseISO(String(data.finish_date)));
    const event = this.ormRepository.create({
      title: data.title,
      price: data.price,
      limit: data.limit,
      start_date: addHours(formattedStartDate, -3),
      finish_date: addHours(formattedFinishDate, -3),
    });
    await this.ormRepository.save(event);

    const hoursDifference =
      formattedFinishDate.getHours() - formattedStartDate.getHours();

    const hoursToAdd = process.env.ENV === 'dev' ? 0 : -3;

    for (let i = 0; i < hoursDifference; i++) {
      data.courts.map(async court => {
        const appointment = this.appointmentsRepository.create({
          id_court: court,
          price: 0,
          start_date: addHours(formattedStartDate, hoursToAdd + i),
          finish_date: addHours(formattedStartDate, hoursToAdd + i),
          canceled: false,
          created_sequence: false,
          id_transaction: '',
          observation: event.id,
        });
        await this.appointmentsRepository.save(appointment);
      });
    }

    data.courts.map(async court => {
      const eventCourt = this.eventsCourtsRepository.create({
        id_event: event.id,
        id_court: court,
      });

      await this.eventsCourtsRepository.save(eventCourt);
    });

    return event;
  }

  public async save(event: Event): Promise<Event> {
    return this.ormRepository.save(event);
  }

  public async findByDate(date: Date): Promise<Event | undefined> {
    const event = await this.ormRepository.findOne({
      where: { start_date: date },
    });
    return event;
  }

  public async createUser(data: ICreateEventUserDTO): Promise<EventUser> {
    const users = await this.usersRepository.find({
      where: {
        id_event: data.id_event,
      },
      order: {
        created_at: 'DESC',
      },
    });

    const user = this.usersRepository.create({
      id_event: data.id_event,
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

  public async findUsersByList(id_event: string): Promise<EventUser[]> {
    const users = await this.usersRepository.query(
      `select use.name, day.paid, day.observation, day.id_transaction, day.paid_price, day.material_amount ,count(day.ticket_number) as tickets, count(CASE WHEN day.retrieved > 0 THEN 1 END) as tickets_retrieved  from events_users day inner join users use on day.id_user = use.id where day.id_event = '${id_event}' group by  use.name, day.paid, day.observation, day.id_transaction, day.paid_price,  day.material_amount`,
    );

    return users;
  }

  public async findByToken(token: string): Promise<Event> {
    const event = await this.ormRepository.findOne({
      where: { token },
    });

    if (!event) {
      throw new AppError('Token not found');
    }

    return event;
  }

  public async findEventAvailability(id_event: string): Promise<number> {
    const users = await this.usersRepository.find({ where: { id_event } });

    if (!users) {
      throw new AppError('Users not found');
    }

    return users.length;
  }

  public async deleteUser(id_user: string, id_event: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id_user, id_event },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    await this.usersRepository.remove(user);
  }

  public async findAll(limit: number): Promise<Event[]> {
    if (limit === 3) {
      const event = await this.ormRepository.find({
        order: {
          start_date: 'ASC',
        },
        take: limit,
      });
      return event;
    }
    const today = new Date();
    const year = today.getFullYear();
    const parsedMonth = String(today.getMonth() + 1).padStart(2, '0');
    const parsedDay = String(today.getDate()).padStart(2, '0');
    const event = await this.ormRepository.query(
      `select day.id, day.title, day.price, day.limit, day.start_date  + interval '3 hour' as start_date, day.finish_date + interval '3 hour' as finish_date,  count(use.id) as users_in_list from events day  left join events_users use on day.id = use.id_event where day.start_date >= '${year}-${parsedMonth}-${parsedDay}'::date group by day.id, day.price, day.limit, day.start_date, day.finish_date order by day.start_date asc`,
    );

    return event;
  }

  public async findAllByUser(id_user: string): Promise<EventUser[]> {
    const events = await this.usersRepository.query(
      `select use.id, use.id_event, use.id_transaction,use.paid, use.paid_price, use.material_amount, use.created_at, day.start_date, day.finish_date, use.ticket_number, use.retrieved from events_users use inner join events day on use.id_event = day.id where use.id_user = '${id_user}' order by created_at asc`,
    );

    return events;
  }

  public async verifyUserIsInList(
    id_event: string,
    id_user: string,
  ): Promise<boolean> {
    const event = await this.usersRepository.find({
      where: { id_event, id_user },
    });
    if (event.length) {
      return true;
    }
    return false;
  }

  public async retrieveTicket(id_ticket: string): Promise<EventUser> {
    const eventUser = await this.usersRepository.findOne({
      where: {
        id: id_ticket,
      },
    });

    if (!eventUser) {
      throw new AppError('User not found');
    }

    eventUser.retrieved = 1;

    await this.usersRepository.save(eventUser);

    return eventUser;
  }

  public async findTicket(id_ticket: string): Promise<EventUser> {
    const eventUser = await this.usersRepository.findOne({
      where: {
        id: id_ticket,
      },
    });

    if (!eventUser) {
      throw new AppError('User not found');
    }

    return eventUser;
  }

  public async deleteEvent(id_event: string): Promise<Event> {
    const event = await this.ormRepository.findOne({
      where: {
        id: id_event,
      },
    });

    if (!event) {
      throw new AppError('Day Use not found');
    }

    await this.ormRepository.remove(event);

    const appointments = await this.appointmentsRepository.find({
      where: { observation: id_event },
    });

    await this.appointmentsRepository.remove(appointments);

    return event;
  }

  public async findEventCourts(id_event: string): Promise<EventCourt> {
    const eventsCourts = await this.eventsCourtsRepository.query(
      `select day.id, cou.name from events_courts day inner join courts cou on day.id_court = cou.id where day.id_event = '${id_event}'`,
    );

    return eventsCourts;
  }
}
export default EventsRepository;
