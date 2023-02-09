export default interface ICreateMonthlyUserDTO {
  id_user: string;
  id_monthly: string;
  flag: string;
  last_digits: string;
  payment_profile: string;
  start_date: Date;
}
