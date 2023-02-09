import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTournamentService from '@modules/places/services/Tournaments/CreateTournamentService';
import FindAllTournamentsInscriptionsService from '@modules/places/services/Tournaments/FindAllTournamentsInscriptionsService';
import IsUserStudentService from '@modules/places/services/Tournaments/IsUserStudentService';
import FindAllCategoriesService from '@modules/places/services/Tournaments/FindAllCategoriesService';
import VerifyUserIsSubscribedService from '@modules/places/services/Tournaments/VerifyUserIsSubscribedService';
import SchedulePixPaymentService from '@modules/places/services/Tournaments/SchedulePixPaymentService';
import FindReportInscriptionsService from '@modules/places/services/Tournaments/FindReportInscriptionsService';

export default class TournamentsController {
  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllInscriptions = container.resolve(
      FindAllTournamentsInscriptionsService,
    );
    const inscriptions = await findAllInscriptions.execute();
    return response.json(inscriptions);
  }

  public async createTournament(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createTournamentService = container.resolve(CreateTournamentService);
    const tournament = await createTournamentService.execute(request.body);
    return response.json(tournament);
  }

  public async isUserStudent(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const isUserStudentService = container.resolve(IsUserStudentService);
    const student = await isUserStudentService.execute(
      String(request.query.ssn),
    );
    return response.json(student);
  }

  public async findAllCategories(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllCategoriesService = container.resolve(
      FindAllCategoriesService,
    );
    const categories = await findAllCategoriesService.execute();
    return response.json(categories);
  }

  public async verifyUserIsSubscribed(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const verifyUserIsSubscribedService = container.resolve(
      VerifyUserIsSubscribedService,
    );
    const isUserSubscribed = await verifyUserIsSubscribedService.execute(
      String(request.query.id_user),
    );
    return response.json(isUserSubscribed);
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

  public async findReportInscriptions(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findReportInscriptionsService = container.resolve(
      FindReportInscriptionsService,
    );

    const inscriptions = await findReportInscriptionsService.execute();

    return response.json(inscriptions);
  }
}
