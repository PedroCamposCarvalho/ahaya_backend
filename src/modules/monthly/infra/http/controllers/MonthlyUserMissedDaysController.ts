import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMonthlyUserMissedDaysService from '../../../services/CreateMonthlyUserMissedDaysService';
import FindByIdMonthlyUserMissedDaysService from '../../../services/FindByIdMonthlyUserMissedDaysService';
import RemoveMonthlyUserMissedDaysService from '../../../services/RemoveMonthlyUserMissedDaysService';

export default class MonthlyUserMissedDaysController {
  public async createMonthlyUserMissedDays(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_monthly, date } = request.body;

    const createMonthlyUserMissedDaysService = container.resolve(
      CreateMonthlyUserMissedDaysService,
    );

    const monthly = await createMonthlyUserMissedDaysService.execute(
      id_monthly,
      date,
    );

    return response.json(monthly);
  }

  public async findByIdMonthlyMissedDays(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findMonthlyMissedDaysService = container.resolve(
      FindByIdMonthlyUserMissedDaysService,
    );

    const { id_monthly } = request.query;

    const monthly = await findMonthlyMissedDaysService.execute(
      String(id_monthly),
    );

    return response.json(monthly);
  }

  public async removeMonthlyMissedDays(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const removeMonthly = container.resolve(RemoveMonthlyUserMissedDaysService);

    const { id } = request.query;

    await removeMonthly.execute(String(id));

    return response.status(200).json({ message: 'Deleted!' });
  }
}
