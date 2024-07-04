export default interface ICreateMonthlyDayDTO {
  id_user: string;
  id_court: string;
  week_day: number;
  hour: number;
  price: number;
  sandbox_product: number;
  production_product: number;
  renew_date: Date;
}
