import { getRepository, Repository, IsNull } from 'typeorm';

import IPayersRepository from '@modules/payers/repositories/IPayersRepository';

import AppError from '@shared/errors/AppError';
import PackagesConfig from '../entities/PackagesConfig';
import PackagesPayers from '../entities/PackagesPayers';
import PackagesHistory from '../entities/PackagesHistory';
import MonthlyRequest from '../entities/MonthlyRequest';
import MonthlyConfig from '../entities/MonthlyConfig';
import MonthlyCreditCards from '../entities/MonthlyCreditCards';
import ChargesHistory from '../entities/ChargesHistory';
import ChargesConfig from '../entities/ChargesConfig';

import ICreatePackagePayerDTO from '../../../dtos/ICreatePackagePayerDTO';
import ICreatePackageDTO from '../../../dtos/ICreatePackageDTO';
import IUpdatePackageDTO from '../../../dtos/IUpdatePackageDTO';
import ICreatePayerDTO from '../../../dtos/ICreatePayerDTO';
import ICreateMonthlyRequestDTO from '../../../dtos/ICreateMonthlyRequestDTO';
import IFindMothlyRequestsFilterDTO from '../../../dtos/IFindMothlyRequestsFilterDTO';
import IReturnFindMonthlyRequestsDTO from '../../../dtos/IReturnFindMonthlyRequestsDTO';
import ICreateMonthlyDTO from '../../../dtos/ICreateMonthlyDTO';
import IUpdateMonthlyDTO from '../../../dtos/IUpdateMonthlyDTO';
import { ICreateMonthlyCreditCardDatabaseDTO } from '../../../dtos/ICreateMonthlyCreditCardDTO';
import IReturnFindPackagesDTO from '../../../dtos/IReturnFindPackagesDTO';

class PayersRepository implements IPayersRepository {
  private packagesRepository: Repository<PackagesConfig>;

  private packagesPayersRepository: Repository<PackagesPayers>;

  private packagesHistoryRepository: Repository<PackagesHistory>;

  private monthlyRequestRepository: Repository<MonthlyRequest>;

  private monthlyConfigRepository: Repository<MonthlyConfig>;

  private creditCardsRepository: Repository<MonthlyCreditCards>;

  private chargesHistoryRepository: Repository<ChargesHistory>;

  private chargesConfigRepository: Repository<ChargesConfig>;

  constructor() {
    this.packagesRepository = getRepository(PackagesConfig);
    this.packagesPayersRepository = getRepository(PackagesPayers);
    this.packagesHistoryRepository = getRepository(PackagesHistory);
    this.monthlyRequestRepository = getRepository(MonthlyRequest);
    this.monthlyConfigRepository = getRepository(MonthlyConfig);
    this.creditCardsRepository = getRepository(MonthlyCreditCards);
    this.chargesHistoryRepository = getRepository(ChargesHistory);
    this.chargesConfigRepository = getRepository(ChargesConfig);
  }

  public async createPackage(data: ICreatePackageDTO): Promise<PackagesConfig> {
    const newPackage = await this.packagesRepository.create({
      amount: data.amount,
      price: Number(String(data.price).replace('R$ ', '').replace(',', '.')),
    });
    await this.packagesRepository.save(newPackage);

    return newPackage;
  }

  public async findAllPackages(): Promise<PackagesConfig[]> {
    const packages = await this.packagesRepository.find({
      order: { amount: 'ASC' },
    });

    return packages;
  }

  public async updatePackage(data: IUpdatePackageDTO): Promise<PackagesConfig> {
    const existingPackage = await this.packagesRepository.findOne({
      where: { id: data.id },
    });

    if (!existingPackage) {
      throw new AppError('Package not found');
    }

    existingPackage.amount = data.amount;
    existingPackage.price = Number(
      String(data.price).replace('R$ ', '').replace(',', '.'),
    );

    await this.packagesRepository.save(existingPackage);

    return existingPackage;
  }

  public async deletePackage(id: string): Promise<PackagesConfig> {
    const existingPackage = await this.packagesRepository.findOne({
      where: { id },
    });

    if (!existingPackage) {
      throw new AppError('Package not found');
    }

    await this.packagesRepository.remove(existingPackage);

    return existingPackage;
  }

  public async createPackagePayer(
    data: ICreatePackagePayerDTO,
  ): Promise<PackagesPayers> {
    const payer = await this.packagesPayersRepository.create(data);
    await this.packagesPayersRepository.save(payer);
    return payer;
  }

  public async findPayer(id_user: string): Promise<PackagesPayers | undefined> {
    const userPayer = await this.packagesPayersRepository.findOne({
      where: { id_user },
      order: { created_at: 'DESC' },
    });

    return userPayer;
  }

  public async findPayerHistory(id_user: string): Promise<PackagesHistory[]> {
    const history = await this.packagesHistoryRepository.query(
      `select * from packages_history pack inner join packages_payers use on pack.id_payer = use.id where use.id_user='${id_user}'`,
    );

    return history;
  }

  public async findPackageById(id_package: string): Promise<PackagesConfig> {
    const existingPackage = await this.packagesRepository.findOne({
      where: { id: id_package },
    });

    if (!existingPackage) {
      throw new AppError('Package not found');
    }

    return existingPackage;
  }

  public async createPayer(data: ICreatePayerDTO): Promise<PackagesPayers> {
    const payer = await this.packagesPayersRepository.create(data);

    await this.packagesPayersRepository.save(payer);

    return payer;
  }

  public async createMonthlyRequest(
    data: ICreateMonthlyRequestDTO,
  ): Promise<MonthlyRequest> {
    const existingRequest = await this.monthlyRequestRepository.findOne({
      where: {
        id_user: data.id_user,
        id_class: data.id_class,
        approved: IsNull(),
      },
    });

    if (existingRequest) {
      throw new AppError('Você já solicitou este horário!');
    }

    const newItem = await this.monthlyRequestRepository.create(data);

    await this.monthlyRequestRepository.save(newItem);

    return newItem;
  }

  public async findAllPendingMonthlyRequests({
    limit = 10,
    offset = 0,
    orderNameBy = 'ASC',
  }: IFindMothlyRequestsFilterDTO): Promise<IReturnFindMonthlyRequestsDTO> {
    const query = this.monthlyRequestRepository.createQueryBuilder(
      'monthly_requests',
    );

    query.select('monthly_requests.id', 'id');
    query.addSelect('use.name', 'user_name');
    query.addSelect('tea.name', 'teacher_name');
    query.addSelect('cla.day_of_week', 'day_of_week');
    query.addSelect('cla.hour', 'hour');
    query.innerJoin('users', 'use', 'monthly_requests.id_user = use.id');
    query.innerJoin(
      'teachers_classes',
      'cla',
      'monthly_requests.id_class = cla.id',
    );
    query.innerJoin('teachers', 'tea', 'cla.id_teacher = tea.id');
    query.andWhere(`monthly_requests.approved is null`);
    query.limit(limit);
    query.offset(offset);
    query.orderBy('user_name', orderNameBy);

    const count = await query.getCount();

    const requests = await query.execute();

    return {
      count,
      requests,
    };
  }

  public async approveMonthlyRequest(
    id_request: string,
  ): Promise<MonthlyRequest> {
    const request = await this.monthlyRequestRepository.findOne({
      where: { id: id_request },
    });

    if (!request) {
      throw new AppError('Request not found');
    }

    request.approved = true;

    await this.monthlyRequestRepository.save(request);

    return request;
  }

  public async reproveMonthlyRequest(
    id_request: string,
  ): Promise<MonthlyRequest> {
    const request = await this.monthlyRequestRepository.findOne({
      where: { id: id_request },
    });

    if (!request) {
      throw new AppError('Request not found');
    }

    request.approved = false;

    await this.monthlyRequestRepository.save(request);

    return request;
  }

  public async createMonthly(data: ICreateMonthlyDTO): Promise<MonthlyConfig> {
    const existingHour = await this.monthlyConfigRepository.findOne({
      where: { hour: data.hour },
    });

    if (existingHour) {
      throw new AppError('Esta hora já está cadastrada');
    }

    const monthly = await this.monthlyConfigRepository.create({
      hour: data.hour,
      price: Number(String(data.price).replace('R$ ', '').replace(',', '.')),
    });
    await this.monthlyConfigRepository.save(monthly);

    return monthly;
  }

  public async findAllMonthly(): Promise<MonthlyConfig[]> {
    const monthlys = await this.monthlyConfigRepository.find({
      order: { hour: 'ASC' },
    });

    return monthlys;
  }

  public async updateMonthly(data: IUpdateMonthlyDTO): Promise<MonthlyConfig> {
    const existingMonthly = await this.monthlyConfigRepository.findOne({
      where: { id: data.id },
    });

    if (!existingMonthly) {
      throw new AppError('Hour not found');
    }

    existingMonthly.hour = data.hour;
    existingMonthly.price = Number(
      String(data.price).replace('R$ ', '').replace(',', '.'),
    );

    await this.monthlyConfigRepository.save(existingMonthly);

    return existingMonthly;
  }

  public async deleteMonthly(id: string): Promise<MonthlyConfig> {
    const existingMonthly = await this.monthlyConfigRepository.findOne({
      where: { id },
    });

    if (!existingMonthly) {
      throw new AppError('Hour not found');
    }

    await this.monthlyConfigRepository.remove(existingMonthly);

    return existingMonthly;
  }

  public async findMonthlyPriceByHour(hour: number): Promise<number> {
    const monthlyConfig = await this.monthlyConfigRepository.findOne({
      where: { hour },
    });

    if (!monthlyConfig) {
      throw new AppError('Monthly config not found');
    }

    return monthlyConfig.price;
  }

  public async createMonthlyCreditCard(
    data: ICreateMonthlyCreditCardDatabaseDTO,
  ): Promise<MonthlyCreditCards> {
    const currentCreditCard = await this.creditCardsRepository.findOne({
      where: { id_user: data.id_user },
    });
    if (currentCreditCard) {
      currentCreditCard.flag = data.flag;
      currentCreditCard.last4digits = data.last4digits;
      currentCreditCard.payment_profile = data.payment_profile;
      await this.creditCardsRepository.save(currentCreditCard);
      return currentCreditCard;
    }
    const monthlyCreditCard = await this.creditCardsRepository.create(data);
    await this.creditCardsRepository.save(monthlyCreditCard);
    return monthlyCreditCard;
  }

  public async findUserCreditCard(
    id_user: string,
  ): Promise<MonthlyCreditCards | undefined> {
    const monthlyCreditCard = await this.creditCardsRepository.findOne({
      where: { id_user },
    });

    return monthlyCreditCard;
  }

  public async findAllUserCharges(id_user: string): Promise<ChargesHistory[]> {
    const charges = await this.chargesHistoryRepository.find({
      where: { id_user },
    });
    return charges;
  }

  public async findUserChargeConfig(
    id_user: string,
  ): Promise<ChargesConfig | undefined> {
    const chargeConfig = await this.chargesConfigRepository.findOne({
      where: { id_user },
    });
    return chargeConfig;
  }

  public async findUserRemainingPackages(
    id_user: string,
  ): Promise<IReturnFindPackagesDTO> {
    const packages = await this.packagesPayersRepository.query(
      `select pack.amount + pay.courtesy - sum(his.amount) as qtd from packages_config pack inner join packages_payers pay on pack.id = pay.id_package left join packages_history his on pay.id = his.id_payer where pay.id_user = '${id_user}' group by pack.amount, pay.courtesy`,
    );
    const payer = await this.packagesPayersRepository.findOne({
      where: { id_user },
    });

    if (!payer) {
      throw new AppError('Payer not found');
    }
    if (!packages[0]) {
      return { packages: 0, payer };
    }
    return { packages: Number(packages[0]), payer };
  }

  public async createHistory(
    id_user: string,
    amount: number,
  ): Promise<PackagesHistory> {
    const payer = await this.packagesPayersRepository.findOne({
      where: { id_user },
      order: { created_at: 'DESC' },
    });
    if (!payer) {
      throw new AppError('Payer not found');
    }

    const packageHistory = await this.packagesHistoryRepository.create({
      id_payer: payer.id,
      amount,
      use_date: new Date(),
    });

    await this.packagesHistoryRepository.save(packageHistory);

    return packageHistory;
  }
}

export default PayersRepository;
