/* eslint-disable import/no-duplicates */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateAppointmentService from '../../../../services/Appointments/CreateAppointmentService';
import FindByIdService from '../../../../services/Appointments/FindByIdService';
import DeleteAppointmentService from '../../../../services/Appointments/DeleteAppointmentService';
import SendScheduledNotifitcationService from '../../../../services/Appointments/Schedules/ScheduleNotificationService';
import DeleteMonthyAppointmentsService from '../../../../services/Appointments/DeleteMonthyAppointmentsService';
import ReturnAgendaAppointmentService from '../../../../services/Appointments/ReturnAgendaAppointmentService';
import FindDayAvailabilityService from '../../../../services/Appointments/FindDayAvailabilityService';
import FindDayAvailabilityService_Calango from '../../../../services/Appointments/Calango/FindDayAvailabilityService_Calango';
import FindCalendarEventsService from '../../../../services/Appointments/Web/FindCalendarEventsService';
import FindUserHistoryService from '../../../../services/Appointments/FindUserHistoryService';
import FindAppointmentMaterialsService from '../../../../services/Appointments/FindAppointmentMaterialsService';
import FindAgendaHoursService from '../../../../services/Appointments/FindAgendaHoursService';
import FindWebReportService from '../../../../services/Appointments/Web/FindWebReportService';
import SchedulePixPaymentService from '../../../../services/Appointments/Schedules/SchedulePixPaymentService';
import CreatePriceService from '../../../../services/Appointments/Prices/CreatePriceService';
import CopyPriceService from '../../../../services/Appointments/Prices/CopyPriceService';
import EditPriceService from '../../../../services/Appointments/Prices/EditPriceService';
import DeletePriceService from '../../../../services/Appointments/Prices/DeletePriceService';
import FindPricesByCourt from '../../../../services/Appointments/Prices/FindPricesByCourt';
import CreatePriceExceptionService from '../../../../services/Appointments/Prices/CreatePriceExceptionService';
import FindExceptionsByCourtService from '../../../../services/Appointments/Prices/FindExceptionsByCourtService';
import DeletePriceExceptionService from '../../../../services/Appointments/Prices/DeletePriceExceptionService';
import EditAppointmentService from '../../../../services/Appointments/EditAppointmentService';
import CreateAppointmentScore from '../../../../services/Appointments/CreateAppointmentScore';

export default class AppointmentsController {
  public async findWebReport(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { type, month, year, id_place } = request.query;
    const findWebReportService = container.resolve(FindWebReportService);
    const data = await findWebReportService.execute({
      type: String(type),
      month: Number(month),
      year: Number(year),
      id_place: String(id_place),
    });
    return response.json(data);
  }

  public async findCalendarEvents(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findCalendarEventsService = container.resolve(
      FindCalendarEventsService,
    );

    const { id_place } = request.query;
    const events = await findCalendarEventsService.execute(String(id_place));
    return response.json(events);
  }

  public async findAgendaAppointment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const returnAgendaAppointmentService = container.resolve(
      ReturnAgendaAppointmentService,
    );
    const { id_appointment } = request.query;

    const appointment = await returnAgendaAppointmentService.execute(
      String(id_appointment),
    );

    return response.json(appointment);
  }

  public async createScore(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const createAppointmentService = container.resolve(
        CreateAppointmentScore,
      );

      const appointments = await createAppointmentService.execute(request.body);

      request.io.emit('newAppointment');

      const ownerSocket =
        request.connectedUsers[request.body.appointment.id_user];

      if (ownerSocket) {
        request.io.to(ownerSocket).emit('refresh_dashboard');
      }

      return response.json(appointments);
    } catch (error) {
      throw new Error('');
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createAppointmentService = container.resolve(
        CreateAppointmentService,
      );

      const appointments = await createAppointmentService.execute(request.body);

      request.io.emit('newAppointment');

      const ownerSocket =
        request.connectedUsers[request.body.appointment.id_user];

      if (ownerSocket) {
        request.io.to(ownerSocket).emit('refresh_dashboard');
      }

      return response.json(appointments);
    } catch (error) {
      throw new Error('');
    }
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_appointment } = request.query;
    const getById = container.resolve(FindByIdService);
    const appointment = await getById.execute(String(id_appointment));
    return response.json(classToClass(appointment));
  }

  public async deleteAppointment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_appointment } = request.query;
    const deleteAppointmentService = container.resolve(
      DeleteAppointmentService,
    );
    const appointment = await deleteAppointmentService.execute(
      String(id_appointment),
    );
    return response.json(appointment);
  }

  public async findAgendaAppointments(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { day, month, year, id_place } = request.query;

    const findAgendaHoursService = container.resolve(FindAgendaHoursService);

    const appointments = await findAgendaHoursService.execute(
      Number(day),
      Number(month),
      Number(year),
      String(id_place) || undefined,
    );
    return response.json(appointments);
  }

  public async sendScheduledNotifitcation(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const sendScheduledNotifitcationService = container.resolve(
      SendScheduledNotifitcationService,
    );
    await sendScheduledNotifitcationService.execute();
    return response.json({ ok: true });
  }

  public async deleteMonthlyAppointments(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteMonthyAppointmentsService = container.resolve(
      DeleteMonthyAppointmentsService,
    );
    const { id_appointment } = request.query;

    const appointments = await deleteMonthyAppointmentsService.execute(
      String(id_appointment),
    );

    return response.json(appointments);
  }

  public async findDayAvailability(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findDayAvailabilityService = container.resolve(
      FindDayAvailabilityService,
    );

    const { day, month, year, id_place, id_sport } = request.query;
    const data = {
      day: Number(day),
      month: Number(month),
      year: Number(year),
      id_place: String(id_place),
      id_sport: String(id_sport),
    };

    const availability = await findDayAvailabilityService.execute(data);

    return response.json(availability);
  }

  public async findDayAvailability_temp(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findDayAvailabilityService = container.resolve(
      FindDayAvailabilityService_Calango,
    );

    const { day, month, year, id_place, id_sport } = request.query;
    const data = {
      day: Number(day),
      month: Number(month),
      year: Number(year),
      id_place: String(id_place),
      id_sport: String(id_sport),
    };

    const availability = await findDayAvailabilityService.execute(data);

    return response.json(availability);
  }

  public async findUserHistory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_user, month, year } = request.query;
    const findUserHistoryService = container.resolve(FindUserHistoryService);
    const courts = await findUserHistoryService.execute({
      id_user: String(id_user),
      month: Number(month),
      year: Number(year),
    });
    return response.json(classToClass(courts));
  }

  public async findAppointmentMaterials(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_appointment } = request.query;
    const findAppointmentMaterialsService = container.resolve(
      FindAppointmentMaterialsService,
    );
    const materials = await findAppointmentMaterialsService.execute(
      String(id_appointment),
    );
    return response.json(materials);
  }

  public async schedulePixPayment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const schedulePixPaymentService = container.resolve(
      SchedulePixPaymentService,
    );

    await schedulePixPaymentService.execute();

    return response.json({ ok: true });
  }

  public async createPrice(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createPriceService = container.resolve(CreatePriceService);

    const price = await createPriceService.execute(request.body);

    return response.json(price);
  }

  public async copyPrice(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const copyPriceService = container.resolve(CopyPriceService);

    const price = await copyPriceService.execute(request.body);

    return response.json(price);
  }

  public async editPrice(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const editPriceService = container.resolve(EditPriceService);

    const price = await editPriceService.execute(request.body);

    return response.json(price);
  }

  public async deletePrice(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deletePriceService = container.resolve(DeletePriceService);

    const { id_price } = request.query;

    const price = await deletePriceService.execute(String(id_price));

    return response.json(price);
  }

  public async findPricesByCourt(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findPricesByCourt = container.resolve(FindPricesByCourt);

    const { id_court } = request.query;

    const prices = await findPricesByCourt.execute(String(id_court));

    return response.json(prices);
  }

  public async createPriceException(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createPriceExceptionService = container.resolve(
      CreatePriceExceptionService,
    );
    const priceException = await createPriceExceptionService.execute(
      request.body,
    );
    return response.json(priceException);
  }

  public async findExceptionsByCourt(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findExceptionsByCourtService = container.resolve(
      FindExceptionsByCourtService,
    );
    const { id_court } = request.query;
    const priceExceptions = await findExceptionsByCourtService.execute(
      String(id_court),
    );
    return response.json(priceExceptions);
  }

  public async deletePriceException(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deletePriceExceptionService = container.resolve(
      DeletePriceExceptionService,
    );
    const { id_exception } = request.query;
    const priceException = await deletePriceExceptionService.execute(
      String(id_exception),
    );
    return response.json(priceException);
  }

  public async editAppointment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const editAppointmentService = container.resolve(EditAppointmentService);

    const appointment = await editAppointmentService.execute(request.body);

    return response.json(appointment);
  }
}
