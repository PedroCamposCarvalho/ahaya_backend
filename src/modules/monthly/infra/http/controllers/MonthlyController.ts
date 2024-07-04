import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindAllAvailableDaysService from '../../../services/FindAllAvailableDaysService';
import CreateMonthlyHourService from '../../../services/CreateMonthlyHourService';
import FindAvailableCourtsFromHourService from '../../../services/FindAvailableCourtsFromHourService';
import FindMonthlyHoursService from '../../../services/FindMonthlyHoursService';
import CreateMonthlyUserService from '../../../services/CreateMonthlyUserService';
import FindUserMonthlyService from '../../../services/FindUserMonthlyService';
import FindAllAdminService from '../../../services/FindAllAdminService';
import CreteMonthlyUserOnWebSystemService from '../../../services/CreateMonthlyUserOnWebSystemService';
import FindAvailableCourtsToCreateOnWebSystemService from '../../../services/FindAvailableCourtsToCreateOnWebSystemService';
import RemoveMonthlyService from '../../../services/RemoveMonthlyService';
import FindCalendarMonthlyService from '../../../services/FindCalendarMonthlyService';

interface IGetCourtsParams {
  dayOfWeek: number;
  hours: number[];
}

export default class MonthlyController {
  public async findAllAvailableDays(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllAvailableDaysService = container.resolve(
      FindAllAvailableDaysService,
    );

    const availableDays = await findAllAvailableDaysService.execute();

    return response.json(availableDays);
  }

  public async createMonthlyHour(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createMonthlyHourService = container.resolve(
      CreateMonthlyHourService,
    );

    const monthly = await createMonthlyHourService.execute(request.body);

    request.io.emit('monthly_hour_created');

    return response.json(monthly);
  }

  public async findAvailableHoursForCourt(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAvailableCourtsFromHourService = container.resolve(
      FindAvailableCourtsFromHourService,
    );

    const { dayOfWeek, hour } = request.query;

    const courts = await findAvailableCourtsFromHourService.execute(
      Number(dayOfWeek),
      Number(hour),
    );

    return response.json(courts);
  }

  public async findMonthlyHours(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findMonthlyHoursService = container.resolve(FindMonthlyHoursService);

    const { dayOfWeek, id_court } = request.query;

    const monthlyHours = await findMonthlyHoursService.execute(
      Number(dayOfWeek),
      String(id_court),
    );

    return response.json(monthlyHours);
  }

  public async createMonthlyUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createMonthlyUserService = container.resolve(
      CreateMonthlyUserService,
    );

    const monthly = await createMonthlyUserService.execute(request.body);

    request.io.emit('monthly_user_created');

    return response.json(monthly);
  }

  public async findUserMonthly(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUserMonthlyService = container.resolve(FindUserMonthlyService);
    const { id_user } = request.query;
    const monthly = await findUserMonthlyService.execute(String(id_user));
    return response.json(monthly);
  }

  public async findAllAdmin(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllAdminService = container.resolve(FindAllAdminService);

    const { dayOfWeek, id_court } = request.query;

    const monthlyHours = await findAllAdminService.execute(
      Number(dayOfWeek),
      String(id_court),
    );

    return response.json(monthlyHours);
  }

  public async createMonthlyHoursOnWebSystem(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const creteMonthlyUserOnWebSystemService = container.resolve(
      CreteMonthlyUserOnWebSystemService,
    );

    const monthly = await creteMonthlyUserOnWebSystemService.execute(
      request.body,
    );

    return response.json(monthly);
  }

  public async findAvailableCourtsToCreateOnWebSystem(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAvailableCourtsToCreateOnWebSystemService = container.resolve(
      FindAvailableCourtsToCreateOnWebSystemService,
    );

    const { dayOfWeek, initialHour, finalHour } = request.query;

    const monthly = await findAvailableCourtsToCreateOnWebSystemService.execute(
      Number(dayOfWeek),
      Number(initialHour),
      Number(finalHour),
    );

    return response.json(monthly);
  }

  public async removeMonthly(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const removeMonthly = container.resolve(RemoveMonthlyService);

    const { id_monthly } = request.query;

    const monthly = await removeMonthly.execute(String(id_monthly));

    return response.json(monthly);
  }

  public async findCalendarMonthly(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findCalendarMonthlyService = container.resolve(
      FindCalendarMonthlyService,
    );

    const { id_place } = request.query;

    const monthly = await findCalendarMonthlyService.execute(String(id_place));

    return response.json(monthly);
  }
}
