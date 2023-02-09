/* eslint-disable import/no-duplicates */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import axios from 'axios';
import SpecificsNotification from '@modules/places/providers/SpecificsNotification';
import WhatsAppNotification from '@modules/places/providers/WhatsAppNotification';
import FindAllAdminUsersService from '@modules/users/services/FindAllAdminUsersService';
import CreateExperimentalClassService from '../../../services/CreateExperimentalClassService';
import FindByDateService from '../../../services/FindByDateService';
import CreateExperimentalClassUserService from '../../../services/CreateExperimentalClassUserService';
import FindUsersByListService from '../../../services/FindUsersByListService';
import FindByTokenService from '../../../services/FindByTokenService';
import FindExperimentalClassAvailabilityService from '../../../services/FindExperimentalClassAvailabilityService';
import DeleteUserService from '../../../services/DeleteUserService';
import FindAllService from '../../../services/FindAllService';
import FindAllByUserService from '../../../services/FindAllByUserService';
import VerifyUserIsInListService from '../../../services/VerifyUserIsInListService';
import FindByIdService from '../../../services/FindByIdService';
import CreateConfigExperimentalClassService from '../../../services/CreateConfigExperimentalClassService';
import ScheduleCreateClassesService from '../../../services/ScheduleCreateClassesService';
import DeleteConfigClassService from '../../../services/DeleteConfigClassService';
import FindAllConfigDaysService from '../../../services/FindAllConfigDaysService';
import EditConfigClassService from '../../../services/EditConfigClassService';
import SchedulePixPaymentService from '../../../services/SchedulePixPaymentService';
import DeleteClassService from '../../../services/DeleteClassService';
import FindExceptionDayByPlaceService from '../../../services/FindExceptionDayByPlaceService';
import CreateExceptionDayService from '../../../services/CreateExceptionDayService';
import DeleteExceptionDayService from '../../../services/DeleteExceptionDayService';
import CreateNotificationService from '../../../../notifications/services/CreateNotificationService';

export default class DayUseController {
  public async findExceptionDayByPlace(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findExceptionDayByPlaceService = container.resolve(
      FindExceptionDayByPlaceService,
    );
    const { id_place } = request.query;
    const exceptionDays = await findExceptionDayByPlaceService.execute(
      String(id_place),
    );

    return response.json(exceptionDays);
  }

  public async createExceptionDay(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createExceptionDayService = container.resolve(
      CreateExceptionDayService,
    );

    const exceptionDay = await createExceptionDayService.execute(request.body);

    return response.json(exceptionDay);
  }

  public async deleteExceptionDay(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteExceptionDayService = container.resolve(
      DeleteExceptionDayService,
    );

    const { id_exceptionDay } = request.query;

    const exceptionDay = await deleteExceptionDayService.execute(
      String(id_exceptionDay),
    );

    return response.json(exceptionDay);
  }

  public async scheduleCreate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const scheduleCreateClassesService = container.resolve(
      ScheduleCreateClassesService,
    );
    await scheduleCreateClassesService.execute();

    return response.json({ ok: true });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { price, limit, start_date } = request.body;

    const createExperimentalClassService = container.resolve(
      CreateExperimentalClassService,
    );
    const experimentalClass = await createExperimentalClassService.execute({
      price,
      limit,
      start_date,
    });

    request.io.emit('NewExperimentalClassList');

    return response.json(experimentalClass);
  }

  public async createConfigClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_place, price, limit, week_day, hour, minutes } = request.body;

    const createExperimentalClassService = container.resolve(
      CreateConfigExperimentalClassService,
    );
    const experimentalClass = await createExperimentalClassService.execute({
      id_place,
      price,
      limit,
      week_day,
      hour,
      minutes,
    });

    return response.json(experimentalClass);
  }

  public async findByDate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { date } = request.body;

    const findByDateService = container.resolve(FindByDateService);
    const experimentalClass = await findByDateService.execute(date);
    return response.json(experimentalClass);
  }

  public async createExperimentalClassUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      id_experimental_class,
      id_user,
      paid,
      observation,
      paid_price,
      id_transaction,
      material_amount,
    } = request.body;

    const createExperimentalClassUserService = container.resolve(
      CreateExperimentalClassUserService,
    );

    const experimentalClassUser =
      await createExperimentalClassUserService.execute({
        id_experimental_class,
        id_user,
        paid,
        observation,
        paid_price,
        id_transaction,
        material_amount,
      });

    const findExperimentalClassAvailabilityService = container.resolve(
      FindExperimentalClassAvailabilityService,
    );

    const availability = await findExperimentalClassAvailabilityService.execute(
      String(id_experimental_class),
    );

    const findByIdService = container.resolve(FindByIdService);

    const experimentalClassDetails = await findByIdService.execute(
      id_experimental_class,
    );

    const title = `Aula experimental - ${String(observation).replace(
      ' - Aula',
      '',
    )} em ${experimentalClassDetails.name}`;
    const formattedDate = format(
      experimentalClassDetails.start_date,
      " dd'/'MM'/'yyyy 'às' HH:mm",
      {
        locale: ptBR,
      },
    );
    const text = `${formattedDate}`;

    const createNotificationService = container.resolve(
      CreateNotificationService,
    );

    const findAllAdminUsersService = container.resolve(
      FindAllAdminUsersService,
    );

    const adminUsers = await findAllAdminUsersService.execute();

    adminUsers.map(async user => {
      await SpecificsNotification([user.one_signal_id], title, text);
      const data = {
        id_user: user.id,
        title,
        text,
      };

      await createNotificationService.execute(data);
      await WhatsAppNotification(user.cellphone, `${title}\n${text}`);

      return null;
    });

    request.io.emit('daylistavailability', availability);

    return response.json(experimentalClassUser);
  }

  public async findUsersByList(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_experimental_class } = request.query;

    const findUsersByListService = container.resolve(FindUsersByListService);

    const experimentalClassUsers = await findUsersByListService.execute(
      String(id_experimental_class),
    );

    return response.json(experimentalClassUsers);
  }

  public async findByToken(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token } = request.query;

    const findByTokenService = container.resolve(FindByTokenService);

    const experimentalClass = await findByTokenService.execute(String(token));

    return response.json(experimentalClass);
  }

  public async findListAvailability(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_experimental_class } = request.query;

    const findExperimentalClassAvailabilityService = container.resolve(
      FindExperimentalClassAvailabilityService,
    );

    const availability = await findExperimentalClassAvailabilityService.execute(
      String(id_experimental_class),
    );

    return response.json(availability);
  }

  public async deleteUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_user, id_experimental_class, id_transaction } = request.query;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(
      String(id_user),
      String(id_experimental_class),
    );

    const findExperimentalClassAvailabilityService = container.resolve(
      FindExperimentalClassAvailabilityService,
    );

    const availability = await findExperimentalClassAvailabilityService.execute(
      String(id_experimental_class),
    );

    request.io.emit('experimentalclasslistavailability', availability);

    const bodyRequest = {
      cancel_bill: true,
      comments: 'Cancelado por API',
    };

    if (id_transaction !== '') {
      try {
        const response2 = await axios.post(
          `https://app.vindi.com.br/api/v1/charges/${id_transaction}/refund`,
          bodyRequest,
          {
            auth: {
              username: 'j6gmPnE3_V8IAVILhI6i1XXGBZ3MfvlpBkgYEd_8FfU',
              password: '',
            },
          },
        );
        if (String(response2.data.charge.status) === 'canceled') {
          return response.json({ ok: true });
        }
        return response.json({ ok: false });
      } catch (error) {
        throw new Error(error as string);
      }
    } else {
      return response.json({ ok: false });
    }
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllService = container.resolve(FindAllService);

    const experimentalClass = await findAllService.execute(
      String(request.query.id_place),
      String(request.query.past) === 'true',
    );

    return response.json({ experimentalClass });
  }

  public async findAllByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllByUserService = container.resolve(FindAllByUserService);

    const experimentalClass = await findAllByUserService.execute(
      String(request.query.id_user),
    );

    return response.json(experimentalClass);
  }

  public async verifyUserIsInList(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const verifyUserIsInListService = container.resolve(
      VerifyUserIsInListService,
    );

    const experimentalClass = await verifyUserIsInListService.execute(
      String(request.query.id_experimental_class),
      String(request.query.id_user),
    );

    return response.json(experimentalClass);
  }

  public async findAllConfigDays(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllConfigDaysService = container.resolve(
      FindAllConfigDaysService,
    );

    const { id_place } = request.query;

    const experimentalClasses = await findAllConfigDaysService.execute(
      String(id_place),
    );

    return response.json(experimentalClasses);
  }

  public async deleteConfigClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteConfigClassService = container.resolve(
      DeleteConfigClassService,
    );

    const { id_class } = request.query;

    const experimentalClasse = await deleteConfigClassService.execute(
      String(id_class),
    );

    return response.json(experimentalClasse);
  }

  public async editConfigClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, id_place, price, limit, week_day, hour, minutes } =
      request.body;

    const editConfigClassService = container.resolve(EditConfigClassService);
    const experimentalClass = await editConfigClassService.execute({
      id,
      id_place,
      price,
      limit,
      week_day,
      hour,
      minutes,
    });

    return response.json(experimentalClass);
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

  public async deleteClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_class } = request.query;

    const deleteClassService = container.resolve(DeleteClassService);

    await deleteClassService.execute(String(id_class));

    return response.json({ ok: true });
  }
}
