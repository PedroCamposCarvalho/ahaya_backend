/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindUserByIdService from '@modules/users/services/FindByIdService';

import SpecificsNotification from '@modules/store/providers/SpecificsNotification';

import CreateClassUserService from '@modules/teachers/services/CreateClassUserService';

import CreatePackageService from '@modules/payers/services/CreatePackageService';
import FindAllPackagesService from '@modules/payers/services/FindAllPackagesService';
import UpdatePackageService from '@modules/payers/services/UpdatePackageService';
import DeletePackageService from '@modules/payers/services/DeletePackageService';
import CreatePackagePayerService from '@modules/payers/services/CreatePackagePayerService';
import FindRemainingPackagesService from '@modules/payers/services/FindRemainingPackagesService';
import CreatePayerService from '@modules/payers/services/CreatePayerService';
import CreateMonthlyRequestService from '@modules/payers/services/CreateMonthlyRequestService';
import FindPendingRequestsService from '@modules/payers/services/FindPendingRequestsService';
import CreateMonthlyService from '@modules/payers/services/CreateMonthlyService';
import FindAllMonthlyService from '@modules/payers/services/FindAllMonthlyService';
import UpdateMonthlyService from '@modules/payers/services/UpdateMonthlyService';
import DeleteMonthlyService from '@modules/payers/services/DeleteMonthlyService';
import ApproveMonthlyRequestService from '@modules/payers/services/ApproveMonthlyRequestService';
import ReproveMonthlyRequestService from '@modules/payers/services/ReproveMonthlyRequestService';
import FindMonthlyPriceByHourService from '@modules/payers/services/FindMonthlyPriceByHourService';
import CreateMonthlyCreditCardService from '@modules/payers/services/CreateMonthlyCreditCardService';
import FindUserCreditCardService from '@modules/payers/services/FindUserCreditCardService';
import FindAllUserChargesService from '@modules/payers/services/FindAllUserChargesService';
import FindUserChargeConfigService from '@modules/payers/services/FindUserChargeConfigService';
import UsePackageToClassService from '@modules/payers/services/UsePackageToClassService';

import AppError from '@shared/errors/AppError';

export default class PayersController {
  public async createPackage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createPackageService = container.resolve(CreatePackageService);
    const newPackage = await createPackageService.execute(request.body);

    return response.json(newPackage);
  }

  public async findAllPackages(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllPackagesService = container.resolve(FindAllPackagesService);
    const packages = await findAllPackagesService.execute();

    return response.json(packages);
  }

  public async updatePackage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updatePackageService = container.resolve(UpdatePackageService);
    const existingPackage = await updatePackageService.execute(request.body);

    return response.json(existingPackage);
  }

  public async deletePackage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deletePackageService = container.resolve(DeletePackageService);
    const existingPackage = await deletePackageService.execute(
      String(request.query.id),
    );

    return response.json(existingPackage);
  }

  public async createPackagePayer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createPackagePayerService = container.resolve(
      CreatePackagePayerService,
    );
    const newPayer = await createPackagePayerService.execute(request.body);

    return response.json(newPayer);
  }

  public async findRemainingPackages(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findRemainingPackagesService = container.resolve(
      FindRemainingPackagesService,
    );
    const remainingPackages = await findRemainingPackagesService.execute(
      String(request.query.id_user),
    );

    return response.json(remainingPackages);
  }

  public async createPayer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createPayerService = container.resolve(CreatePayerService);
    const payer = await createPayerService.execute(request.body);

    const { id_user } = request.body;

    const ownerSocket = request.connectedUsers[String(id_user)];

    if (ownerSocket) {
      request.io.to(ownerSocket).emit('packages_bought');
    }

    return response.json(payer);
  }

  public async createMonthlyRequest(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createMonthlyRequestService = container.resolve(
      CreateMonthlyRequestService,
    );
    const monthlyRequest = await createMonthlyRequestService.execute(
      request.body,
    );

    request.io.emit('newMonthlyRequest');

    return response.json(monthlyRequest);
  }

  public async findPendingRequests(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findPendingRequestsService = container.resolve(
      FindPendingRequestsService,
    );
    const filters = request.query;
    const pendingRequests = await findPendingRequestsService.execute(
      filters as any,
    );

    return response.json(pendingRequests);
  }

  public async createMonthly(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createMonthlyService = container.resolve(CreateMonthlyService);

    const monthly = await createMonthlyService.execute(request.body);

    return response.json(monthly);
  }

  public async findAllMonthly(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllMonthlyService = container.resolve(FindAllMonthlyService);

    const monthlys = await findAllMonthlyService.execute();

    return response.json(monthlys);
  }

  public async updateMonthly(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateMonthlyService = container.resolve(UpdateMonthlyService);
    const existingMonthly = await updateMonthlyService.execute(request.body);

    return response.json(existingMonthly);
  }

  public async deleteMonthly(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteMonthlyService = container.resolve(DeleteMonthlyService);
    const existingMonthly = await deleteMonthlyService.execute(
      String(request.query.id),
    );

    return response.json(existingMonthly);
  }

  public async approveMonthly(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const approveMonthlyRequestService = container.resolve(
      ApproveMonthlyRequestService,
    );

    const { id_request } = request.query;
    const approvedRequest = await approveMonthlyRequestService.execute(
      String(id_request),
    );

    const findByIdService = container.resolve(FindUserByIdService);

    const user = await findByIdService.execute(approvedRequest.id_user);

    if (!user) {
      throw new AppError('User not found');
    }

    SpecificsNotification(
      [user.notification_id],
      'Aula mensal aprovada!',
      'Utilize seu QR Code aqui no app para fazer check-in na aula',
    );

    const createClassUserService = container.resolve(CreateClassUserService);

    const data = {
      id_class: approvedRequest.id_class,
      id_user: user.id,
      id_transaction: '',
      name: user.name,
      ssn: user.ssn,
      birth_date: new Date(),
      category: '',
      plan: '',
      due_date: new Date(),
    };

    await createClassUserService.execute(data);

    const ownerSocket = request.connectedUsers[approvedRequest.id_user];

    if (ownerSocket) {
      request.io.to(ownerSocket).emit('request_approved');
    }

    return response.json(approvedRequest);
  }

  public async reproveMonthly(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const reproveMonthlyRequestService = container.resolve(
      ReproveMonthlyRequestService,
    );

    const { id_request } = request.query;

    const reprovedRequest = await reproveMonthlyRequestService.execute(
      String(id_request),
    );

    const findByIdService = container.resolve(FindUserByIdService);

    const user = await findByIdService.execute(reprovedRequest.id_user);

    if (!user) {
      throw new AppError('User not found');
    }

    SpecificsNotification(
      [user.notification_id],
      'Aula mensal reprovada!',
      'Entre em contato conosco para entender melhor o que aconteceu!',
    );

    return response.json(reprovedRequest);
  }

  public async findMonthlyPriceByHour(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findMonthlyPriceByHourService = container.resolve(
      FindMonthlyPriceByHourService,
    );

    const { hour } = request.query;
    const price = await findMonthlyPriceByHourService.execute(Number(hour));

    return response.json(price);
  }

  public async createMonthlyCreditCard(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createMonthlyCreditCardService = container.resolve(
      CreateMonthlyCreditCardService,
    );

    const monthlyCreditCard = await createMonthlyCreditCardService.execute(
      request.body,
    );

    return response.json(monthlyCreditCard);
  }

  public async findUserCreditCard(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUserCreditCardService = container.resolve(
      FindUserCreditCardService,
    );

    const { id_user } = request.query;
    const monthlyCreditCard = await findUserCreditCardService.execute(
      String(id_user),
    );

    return response.json(monthlyCreditCard);
  }

  public async findAllUserCharges(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllUserChargesService = container.resolve(
      FindAllUserChargesService,
    );

    const { id_user } = request.query;
    const charges = await findAllUserChargesService.execute(String(id_user));

    return response.json(charges);
  }

  public async findUserChargeConfig(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUserChargeConfigService = container.resolve(
      FindUserChargeConfigService,
    );

    const { id_user } = request.query;
    const chargeConfig = await findUserChargeConfigService.execute(
      String(id_user),
    );

    return response.json(chargeConfig);
  }

  public async usePackagesToWeekClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const usePackageToClassService = container.resolve(
      UsePackageToClassService,
    );
    const weekClass = await usePackageToClassService.execute(request.body);

    const ownerSocket = request.connectedUsers[request.body.id_user];

    request.io.to(ownerSocket).emit('refresh_dashboard_classes');

    return response.json(weekClass);
  }
}
