import Event from '../infra/typeorm/entities/Event';
import EventUser from '../infra/typeorm/entities/EventUser';
import EventCourt from '../infra/typeorm/entities/EventCourt';
import ICreateEventDTO from '../dtos/ICreateEventDTO';
import ICreateEventUserDTO from '../dtos/ICreateEventUserDTO';

export default interface IEventsRepository {
  create(data: ICreateEventDTO): Promise<Event>;
  findByDate(date: Date): Promise<Event | undefined>;
  createUser(data: ICreateEventUserDTO): Promise<EventUser>;
  findUsersByList(id_event: string): Promise<EventUser[]>;
  findByToken(token: string): Promise<Event>;
  findEventAvailability(id_event: string): Promise<number>;
  deleteUser(id_user: string, id_event: string): Promise<void>;
  findAll(limit: number): Promise<Event[]>;
  findAllByUser(id_user: string): Promise<EventUser[]>;
  verifyUserIsInList(id_event: string, id_user: string): Promise<boolean>;
  retrieveTicket(id_ticket: string): Promise<EventUser>;
  findTicket(id_ticket: string): Promise<EventUser>;
  deleteEvent(id_event: string): Promise<Event>;
  findEventCourts(id_event: string): Promise<EventCourt>;
}
