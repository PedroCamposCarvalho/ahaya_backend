export default interface ICreatePackagePayerDTO {
  id_user: string;

  id_package: string;

  paid: boolean;

  paid_date: Date;

  id_transaction: string;

  courtesy: number;

  discount: number;

  expires_in?: Date;
}
