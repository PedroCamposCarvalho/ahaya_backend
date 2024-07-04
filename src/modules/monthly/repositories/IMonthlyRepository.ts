import IReturnFindAllDTO from '@modules/monthly/dtos/IReturnFindAllDTO';
import ICreateMonthlyDayDTO from '@modules/monthly/dtos/ICreateMonthlyDayDTO';
import ICreateMonthlyUserDTO from '@modules/monthly/dtos/ICreateMonthlyUserDTO';
import IReturnAdminFindAllDTO from '@modules/monthly/dtos/IReturnAdminFindAllDTO';
import IFindAppAgendaDTO from '@modules/monthly/dtos/IFindAppAgendaDTO';
import ICreateMonthlyUserOnWebSystemDTO from '@modules/monthly/dtos/ICreateMonthlyUserOnWebSystemDTO';
import IReturnMonthlysForAppAgendaDTO from '@modules/monthly/dtos/IReturnMonthlysForAppAgendaDTO';
import Court from '@modules/places/infra/typeorm/entities/Courts/Court';
import Monthly from '../infra/typeorm/entities/Monthly';

export default interface IMonthlyRepository {
  findAllAvailableDays(): Promise<IReturnFindAllDTO[]>;
  createMonthlyHour(data: ICreateMonthlyDayDTO): Promise<Monthly>;
  findAvailableCourtsForHour(dayOfWeek: number, hour: number): Promise<Court[]>;
  findAvailableCourtsByHours(
    dayOfWeek: number,
    hours: number[],
  ): Promise<Court[]>;
  findMonthlyHours(dayOfWeek: number, id_court: string): Promise<Monthly[]>;
  createMonthlyUser(data: ICreateMonthlyUserDTO): Promise<Monthly>;
  findUserMonthly(id_user: string): Promise<Monthly[]>;
  findAdminAll(
    dayOfWeek: number,
    id_court: string,
  ): Promise<IReturnAdminFindAllDTO[]>;
  findBlockedHours(dayOfWeek: number, hour: number): Promise<Monthly[]>;
  findAll(): Promise<IReturnAdminFindAllDTO[]>;
  createMonthlyUserOnWebSystem(
    data: ICreateMonthlyUserOnWebSystemDTO,
  ): Promise<boolean>;
  findAllByWeekDay(dayOfWeek: number): Promise<Monthly[]>;
  removeMonthly(id_monthly: string): Promise<Monthly>;
  findMonthlysForAppAgenda(
    data: IFindAppAgendaDTO,
  ): Promise<IReturnMonthlysForAppAgendaDTO[]>;
}
