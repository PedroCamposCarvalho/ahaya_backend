/* eslint-disable import/no-duplicates */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { format } from 'date-fns';
// import ptBR from 'date-fns/locale/pt-BR';
import CreateDayUseService from '../../../services/CreateDayUseService';
import FindByDateService from '../../../services/FindByDateService';
import CreateDayUseUserService from '../../../services/CreateDayUseUserService';
import FindUsersByListService from '../../../services/FindUsersByListService';
import FindByTokenService from '../../../services/FindByTokenService';
import FindDayUseAvailabilityService from '../../../services/FindDayUseAvailabilityService';
import DeleteUserService from '../../../services/DeleteUserService';
import FindAllService from '../../../services/FindAllService';
import FindAllByUserService from '../../../services/FindAllByUserService';
import VerifyUserIsInListService from '../../../services/VerifyUserIsInListService';
import RetrieveTicketService from '../../../services/RetrieveTicketService';
import FindTicketService from '../../../services/FindTicketService';
import DeleteDayUseService from '../../../services/DeleteDayUseService';
import FindDayUseCourtsService from '../../../services/FindDayUseCourtsService';
import SchedulePixPaymentService from '../../../services/SchedulePixPaymentService';

export default class DayUseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { courts, price, limit, start_date, finish_date, id_place } =
      request.body;

    const createDayUseService = container.resolve(CreateDayUseService);
    const dayUse = await createDayUseService.execute({
      courts,
      price,
      limit,
      start_date,
      finish_date,
      id_place,
    });

    // function getDayDescription(date: Date): string {
    //   if (date.getDay() === 0 || date.getDay() === 6) {
    //     const formattedDate = format(date, "EEEE', ' dd'/'MM'/'yyyy'", {
    //       locale: ptBR,
    //     });
    //     return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    //   }
    //   const formattedDate = format(date, "EEEE'-Feira, ' dd'/'MM'/'yyyy'", {
    //     locale: ptBR,
    //   });
    //   return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    // }

    // function getHourDescription(date2: Date, finish_date2: Date): string {
    //   const firstHour = format(date2, 'HH:00', {
    //     locale: ptBR,
    //   });
    //   const lastHour = format(finish_date2, 'HH:00', {
    //     locale: ptBR,
    //   });
    //   return `, de ${firstHour} às ${lastHour}`;
    // }

    // const message =
    //   getDayDescription(dayUse.start_date) +
    //   getHourDescription(dayUse.start_date, dayUse.finish_date);

    request.io.emit('NewDayUseList');

    // await CreateNotification('Novo Day Use!', message);

    return response.json(dayUse);
  }

  public async findByDate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { date } = request.body;

    const findByDateService = container.resolve(FindByDateService);
    const dayUse = await findByDateService.execute(date);
    return response.json(dayUse);
  }

  public async createDayUseUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      id_dayuse,
      id_user,
      paid,
      observation,
      paid_price,
      id_transaction,
      material_amount,
    } = request.body;

    const createDayUseUserService = container.resolve(CreateDayUseUserService);

    const dayUseUser = await createDayUseUserService.execute({
      id_dayuse,
      id_user,
      paid,
      observation,
      paid_price,
      id_transaction,
      material_amount,
    });

    const findDayUseAvailabilityService = container.resolve(
      FindDayUseAvailabilityService,
    );

    const availability = await findDayUseAvailabilityService.execute(
      String(id_dayuse),
    );

    request.io.emit('daylistavailability', availability);

    return response.json(dayUseUser);
  }

  public async findUsersByList(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_dayuse } = request.query;

    const findUsersByListService = container.resolve(FindUsersByListService);

    const dayUseUsers = await findUsersByListService.execute(String(id_dayuse));

    return response.json(dayUseUsers);
  }

  public async findByToken(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.query;

    const findByTokenService = container.resolve(FindByTokenService);

    const dayUse = await findByTokenService.execute(String(token));

    return response.json(dayUse);
  }

  public async findListAvailability(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_dayuse } = request.query;

    const findDayUseAvailabilityService = container.resolve(
      FindDayUseAvailabilityService,
    );

    const availability = await findDayUseAvailabilityService.execute(
      String(id_dayuse),
    );

    return response.json(availability);
  }

  public async deleteUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_user, id_dayuse } = request.query;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(String(id_user), String(id_dayuse));

    const findDayUseAvailabilityService = container.resolve(
      FindDayUseAvailabilityService,
    );

    const availability = await findDayUseAvailabilityService.execute(
      String(id_dayuse),
    );

    request.io.emit('daylistavailability', availability);

    return response.json({ ok: true });
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllService = container.resolve(FindAllService);

    const dayuse = await findAllService.execute(
      Number(request.query.limit),
      String(request.query.past) === 'true',
    );

    return response.json({ dayuse });
  }

  public async findAllByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllByUserService = container.resolve(FindAllByUserService);

    const dayuse = await findAllByUserService.execute(
      String(request.query.id_user),
    );

    return response.json(dayuse);
  }

  public async verifyUserIsInList(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const verifyUserIsInListService = container.resolve(
      VerifyUserIsInListService,
    );

    const dayuse = await verifyUserIsInListService.execute(
      String(request.query.id_dayuse),
      String(request.query.id_user),
    );

    return response.json(dayuse);
  }

  public async retrieveTicket(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const retrieveTicketServicer = container.resolve(RetrieveTicketService);

    const dayUseUser = await retrieveTicketServicer.execute(
      String(request.query.id_ticket),
    );

    const ownerSocket = request.connectedUsers[dayUseUser.id_user];

    if (ownerSocket) {
      request.io.to(ownerSocket).emit('ticket_retrieved');
    }
    request.io.emit('ticket_retrieved_admin');
    return response.json(dayUseUser);
  }

  public async findTicket(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findTicketService = container.resolve(FindTicketService);

    const dayUseUser = await findTicketService.execute(
      String(request.query.id_ticket),
    );

    return response.json(dayUseUser);
  }

  public async deleteDayUse(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteDayUseService = container.resolve(DeleteDayUseService);

    const dayUse = await deleteDayUseService.execute(
      String(request.query.id_dayuse),
    );

    return response.json(dayUse);
  }

  public async FindDayUseCourts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findDayUseCourtsService = container.resolve(FindDayUseCourtsService);

    const dayUse = await findDayUseCourtsService.execute(
      String(request.query.id_dayuse),
    );

    return response.json(dayUse);
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
}
