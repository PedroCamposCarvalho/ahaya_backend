import PackagesConfig from '../infra/typeorm/entities/PackagesConfig';
import PackagesPayers from '../infra/typeorm/entities/PackagesPayers';
import PackagesHistory from '../infra/typeorm/entities/PackagesHistory';
import MonthlyRequest from '../infra/typeorm/entities/MonthlyRequest';
import MonthlyConfig from '../infra/typeorm/entities/MonthlyConfig';
import MonthlyCreditCards from '../infra/typeorm/entities/MonthlyCreditCards';
import ChargesHistory from '../infra/typeorm/entities/ChargesHistory';
import ChargesConfig from '../infra/typeorm/entities/ChargesConfig';

import ICreatePackagePayerDTO from '../dtos/ICreatePackagePayerDTO';
import ICreatePackageDTO from '../dtos/ICreatePackageDTO';
import IUpdatePackageDTO from '../dtos/IUpdatePackageDTO';
import ICreatePayerDTO from '../dtos/ICreatePayerDTO';
import ICreateMonthlyRequestDTO from '../dtos/ICreateMonthlyRequestDTO';
import IFindMothlyRequestsFilterDTO from '../dtos/IFindMothlyRequestsFilterDTO';
import IReturnFindMonthlyRequestsDTO from '../dtos/IReturnFindMonthlyRequestsDTO';
import ICreateMonthlyDTO from '../dtos/ICreateMonthlyDTO';
import IUpdateMonthlyDTO from '../dtos/IUpdateMonthlyDTO';
import { ICreateMonthlyCreditCardDatabaseDTO } from '../dtos/ICreateMonthlyCreditCardDTO';
import IReturnFindPackagesDTO from '../dtos/IReturnFindPackagesDTO';

export default interface IPayersRepository {
  createPackage(data: ICreatePackageDTO): Promise<PackagesConfig>;
  findAllPackages(): Promise<PackagesConfig[]>;
  updatePackage(data: IUpdatePackageDTO): Promise<PackagesConfig>;
  deletePackage(id: string): Promise<PackagesConfig>;
  createPackagePayer(data: ICreatePackagePayerDTO): Promise<PackagesPayers>;
  findPayer(id_user: string): Promise<PackagesPayers | undefined>;
  findPayerHistory(id_user: string): Promise<PackagesHistory[]>;
  findPackageById(id_package: string): Promise<PackagesConfig>;
  createPayer(data: ICreatePayerDTO): Promise<PackagesPayers>;
  createMonthlyRequest(data: ICreateMonthlyRequestDTO): Promise<MonthlyRequest>;
  findAllPendingMonthlyRequests(
    filters: IFindMothlyRequestsFilterDTO,
  ): Promise<IReturnFindMonthlyRequestsDTO>;
  approveMonthlyRequest(id_request: string): Promise<MonthlyRequest>;
  reproveMonthlyRequest(id_request: string): Promise<MonthlyRequest>;
  createMonthly(data: ICreateMonthlyDTO): Promise<MonthlyConfig>;
  findAllMonthly(): Promise<MonthlyConfig[]>;
  updateMonthly(data: IUpdateMonthlyDTO): Promise<MonthlyConfig>;
  deleteMonthly(id: string): Promise<MonthlyConfig>;
  findMonthlyPriceByHour(hour: number): Promise<number>;
  createMonthlyCreditCard(
    data: ICreateMonthlyCreditCardDatabaseDTO,
  ): Promise<MonthlyCreditCards>;
  findUserCreditCard(id_user: string): Promise<MonthlyCreditCards | undefined>;
  findAllUserCharges(id_user: string): Promise<ChargesHistory[]>;
  findUserChargeConfig(id_user: string): Promise<ChargesConfig | undefined>;
  findUserRemainingPackages(id_user: string): Promise<IReturnFindPackagesDTO>;
  createHistory(id_user: string, amount: number): Promise<PackagesHistory>;
}
