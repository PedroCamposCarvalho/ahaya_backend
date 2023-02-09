/* eslint-disable import/no-duplicates */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateNotification from '@modules/store/providers/GeneralNotification';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import CreateEventService from '../../../services/CreateEventService';
import FindByDateService from '../../../services/FindByDateService';
import CreateEventUserService from '../../../services/CreateEventUserService';
import FindUsersByListService from '../../../services/FindUsersByListService';
import FindByTokenService from '../../../services/FindByTokenService';
import FindEventAvailabilityService from '../../../services/FindEventAvailabilityService';
import DeleteUserService from '../../../services/DeleteUserService';
import FindAllService from '../../../services/FindAllService';
import FindAllByUserService from '../../../services/FindAllByUserService';
import VerifyUserIsInListService from '../../../services/VerifyUserIsInListService';
import RetrieveTicketService from '../../../services/RetrieveTicketService';
import FindTicketService from '../../../services/FindTicketService';
import DeleteEventService from '../../../services/DeleteEventService';
import FindEventsCourtsService from '../../../services/FindEventsCourtsService';

export default class EventsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      courts,
      title,
      price,
      limit,
      start_date,
      finish_date,
    } = request.body;

    const createEventService = container.resolve(CreateEventService);
    const dayUse = await createEventService.execute({
      title,
      courts,
      price,
      limit,
      start_date,
      finish_date,
    });

    function getDayDescription(date: Date): string {
      const formattedDate = format(date, "EEEE'-Feira, ' dd'/'MM'/'yyyy'", {
        locale: ptBR,
      });
      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    function getHourDescription(date2: Date, finish_date2: Date): string {
      const firstHour = format(date2, 'HH:00', {
        locale: ptBR,
      });
      const lastHour = format(finish_date2, 'HH:00', {
        locale: ptBR,
      });
      return `, de ${firstHour} às ${lastHour}`;
    }

    const message =
      getDayDescription(dayUse.start_date) +
      getHourDescription(dayUse.start_date, dayUse.finish_date);

    request.io.emit('NewDayUseList');

    await CreateNotification('Novo Day Use!', message);

    return response.json(dayUse);
  }

  public async findByDate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { date } = request.body;

    const findByDateService = container.resolve(FindByDateService);
    const event = await findByDateService.execute(date);
    return response.json(event);
  }

  public async createEventUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      id_event,
      id_user,
      paid,
      observation,
      paid_price,
      id_transaction,
      material_amount,
    } = request.body;

    const createEventUserService = container.resolve(CreateEventUserService);

    const eventUser = await createEventUserService.execute({
      id_event,
      id_user,
      paid,
      observation,
      paid_price,
      id_transaction,
      material_amount,
    });

    const findEventAvailabilityService = container.resolve(
      FindEventAvailabilityService,
    );

    const availability = await findEventAvailabilityService.execute(
      String(id_event),
    );

    request.io.emit('daylistavailability', availability);

    return response.json(eventUser);
  }

  public async findUsersByList(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_event } = request.query;

    const findUsersByListService = container.resolve(FindUsersByListService);

    const eventUsers = await findUsersByListService.execute(String(id_event));

    return response.json(eventUsers);
  }

  public async findByToken(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.query;

    const findByTokenService = container.resolve(FindByTokenService);

    const event = await findByTokenService.execute(String(token));

    return response.json(event);
  }

  public async findListAvailability(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_event } = request.query;

    const findEventAvailabilityService = container.resolve(
      FindEventAvailabilityService,
    );

    const availability = await findEventAvailabilityService.execute(
      String(id_event),
    );

    return response.json(availability);
  }

  public async deleteUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_user, id_event } = request.query;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(String(id_user), String(id_event));

    const findEventAvailabilityService = container.resolve(
      FindEventAvailabilityService,
    );

    const availability = await findEventAvailabilityService.execute(
      String(id_event),
    );

    request.io.emit('daylistavailability', availability);

    return response.json({ ok: true });
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllService = container.resolve(FindAllService);

    const event = await findAllService.execute(Number(request.query.limit));

    return response.json({ event });
  }

  public async findAllByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllByUserService = container.resolve(FindAllByUserService);

    const event = await findAllByUserService.execute(
      String(request.query.id_user),
    );

    return response.json(event);
  }

  public async verifyUserIsInList(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const verifyUserIsInListService = container.resolve(
      VerifyUserIsInListService,
    );

    const event = await verifyUserIsInListService.execute(
      String(request.query.id_event),
      String(request.query.id_user),
    );

    return response.json(event);
  }

  public async retrieveTicket(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const retrieveTicketServicer = container.resolve(RetrieveTicketService);

    const eventUser = await retrieveTicketServicer.execute(
      String(request.query.id_ticket),
    );

    const ownerSocket = request.connectedUsers[eventUser.id_user];

    if (ownerSocket) {
      request.io.to(ownerSocket).emit('ticket_retrieved');
    }
    request.io.emit('ticket_retrieved_admin');
    return response.json(eventUser);
  }

  public async findTicket(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findTicketService = container.resolve(FindTicketService);

    const eventUser = await findTicketService.execute(
      String(request.query.id_ticket),
    );

    return response.json(eventUser);
  }

  public async deleteEvent(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteEventService = container.resolve(DeleteEventService);

    const event = await deleteEventService.execute(
      String(request.query.id_event),
    );

    return response.json(event);
  }

  public async FindDayUseCourts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findEventsCourtsService = container.resolve(FindEventsCourtsService);

    const event = await findEventsCourtsService.execute(
      String(request.query.id_event),
    );

    return response.json(event);
  }
}
