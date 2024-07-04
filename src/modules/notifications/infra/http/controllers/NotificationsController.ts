import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateNotificationService from '@modules/notifications/services/CreateNotificationService';
import FindAllFromUserService from '@modules/notifications/services/FindAllFromUserService';

export default class NotificationsController {
  public async ceeate(request: Request, response: Response): Promise<Response> {
    const createNotificationService = container.resolve(
      CreateNotificationService,
    );
    const notification = await createNotificationService.execute(request.body);
    return response.json(notification);
  }

  public async findAllFromUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllFromUserService = container.resolve(FindAllFromUserService);
    const { id_user } = request.query;
    const notifications = await findAllFromUserService.execute(String(id_user));
    return response.json(notifications);
  }
}
