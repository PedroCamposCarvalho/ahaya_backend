import ICreatePriceDTO from '@modules/places/dtos/Appointments/ICreatePriceDTO';
import IEditPriceDTO from '@modules/places/dtos/Appointments/IEditPriceDTO';
import IEditAppointmentDTO from '@modules/places/dtos/Appointments/IEditAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointments/Appointment';
import AppointmentUsers from '../../infra/typeorm/entities/Appointments/AppointmentUsers';
import AppointmentPrice from '../../infra/typeorm/entities/Appointments/AppointmentPrice';
import AppointmentsPricesExceptions from '../../infra/typeorm/entities/Appointments/AppointmentsPricesExceptions';
import AppointmentMaterials from '../../infra/typeorm/entities/Appointments/AppointmentMaterials';
import IFindAllInDayDTO from '../../dtos/Appointments/IFindAllInDayDTO';
import IScheduleNotificationDTO from '../../dtos/Appointments/IScheduleNotificationDTO';
import IFindUserHistoryFiltersDTO from '../../dtos/Appointments/IFindUserHistoryFiltersDTO';
import IFindAppointmentsMaterialsDTO from '../../dtos/Appointments/IFindAppointmentsMaterialsDTO';
import IReturnAgendaDTO from '../../dtos/Appointments/IReturnAgendaDTO';
import IReturnAgendaAppointmentDTO from '../../dtos/Appointments/IReturnAgendaAppointmentDTO';
import ICreatePriceExceptionDTO from '../../dtos/Appointments/ICreatePriceExceptionDTO';
import IReturnExceptionsForPriceDTO from '../../dtos/Appointments/IReturnExceptionsForPriceDTO';
import {
  IAppointmentProps,
  IHoursProps,
  IAppointmentMaterialsProps,
} from '../../dtos/Appointments/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  save(appointment: Appointment): Promise<Appointment>;
  findById(id_appointment: string): Promise<Appointment>;
  deleteAppointment(id_appointment: string): Promise<boolean>;
  findAppointmentForAgenda(
    id_appointment: string,
  ): Promise<IReturnAgendaAppointmentDTO>;

  findAll(): Promise<Appointment[]>;
  createAppointmentHour(
    hour: IHoursProps,
    appointment: IAppointmentProps,
  ): Promise<Appointment>;
  createAppointmentMaterial(
    materials: IAppointmentMaterialsProps,
    id_appointment: string,
  ): Promise<AppointmentMaterials>;
  findAllInDay(data: IFindAllInDayDTO): Promise<Appointment[]>;
  findUserHistory(data: IFindUserHistoryFiltersDTO): Promise<Appointment[]>;
  createAppointmentUser(
    id_appointment: string,
    id_user: string,
  ): Promise<AppointmentUsers>;
  findAppointmentMaterials(
    id_appointment: string,
  ): Promise<IFindAppointmentsMaterialsDTO[]>;
  findAllInDayForAgenda(data: IFindAllInDayDTO): Promise<IReturnAgendaDTO[]>;
  findByMonthYearPlace(
    month: number,
    year: number,
    id_place: string,
  ): Promise<Appointment[]>;
  findAllUnpaidAppointments(): Promise<Appointment[]>;
  updatePaidAppointment(id_appointment: string): Promise<Appointment>;
  findAllPrices(): Promise<AppointmentPrice[]>;
  findAllInMonth(month: number): Promise<Appointment[]>;

  findPricesByCourt(id_court: string): Promise<AppointmentPrice[]>;
  createPrice(data: ICreatePriceDTO): Promise<AppointmentPrice>;
  editPrice(data: IEditPriceDTO): Promise<AppointmentPrice>;
  deletePrice(id: string): Promise<AppointmentPrice>;
  clearPrice(id_court: string): Promise<void>;
  createPriceException(
    data: ICreatePriceExceptionDTO,
  ): Promise<AppointmentsPricesExceptions>;
  findAllExceptionsByCourt(
    id_court: string,
  ): Promise<AppointmentsPricesExceptions[]>;
  deletePriceException(id: string): Promise<AppointmentsPricesExceptions>;
  findExceptionsByWeekDay(
    week_day: number,
  ): Promise<IReturnExceptionsForPriceDTO[]>;

  // schedule notificação
  findAllInDayToNotify(
    data: IFindAllInDayDTO,
  ): Promise<IScheduleNotificationDTO[]>;

  // mensalista
  findMonthlyAppointments(id_appointment: string): Promise<Appointment[]>;
  editAppointment(data: IEditAppointmentDTO): Promise<Appointment>;
}
