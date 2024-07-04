import PackagesPayers from '../infra/typeorm/entities/PackagesPayers';

export default interface IReturnFindPackagesDTO {
  packages: number;
  payer: PackagesPayers;
}
