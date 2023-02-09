import DayUse from '../infra/typeorm/entities/DayUse';
import DayUseUsers from '../infra/typeorm/entities/DayUseUsers';
import DayUseCourts from '../infra/typeorm/entities/DayUseCourts';
import ICreateDayUseDTO from '../dtos/ICreateDayUseDTO';
import ICreateDayUseUsersDTO from '../dtos/ICreateDayUseUsersDTO';
import IReturnWebReportDTO from '../dtos/IReturnWebReportDTO';

export default interface IUserRepository {
  create(data: ICreateDayUseDTO): Promise<DayUse>;
  findByDate(date: Date): Promise<DayUse | undefined>;
  createUser(data: ICreateDayUseUsersDTO): Promise<DayUseUsers>;
  findUsersByList(id_dayuse: string): Promise<DayUseUsers[]>;
  findByToken(token: string): Promise<DayUse>;
  findDayUseAvailability(id_dayuse: string): Promise<number>;
  deleteUser(id_user: string, id_dayuse: string): Promise<void>;
  findAll(limit: number, past: boolean): Promise<DayUse[]>;
  findAllByUser(id_user: string): Promise<DayUseUsers[]>;
  verifyUserIsInList(id_dayuse: string, id_user: string): Promise<boolean>;
  retrieveTicket(id_ticket: string): Promise<DayUseUsers>;
  findTicket(id_ticket: string): Promise<DayUseUsers>;
  deleteDayUse(id_dayuse: string): Promise<DayUse>;
  findDayUseCourts(id_dayuse: string): Promise<DayUseCourts>;
  findAllUsersInMonth(
    month: number,
    year: number,
    id_place: string,
  ): Promise<IReturnWebReportDTO[]>;
  updateDayUse(data: DayUse): Promise<DayUse>;
  findAllUnpaidUsers(): Promise<DayUseUsers[]>;
  updatePaidUser(id_dayuseuser: string): Promise<DayUseUsers>;
}
