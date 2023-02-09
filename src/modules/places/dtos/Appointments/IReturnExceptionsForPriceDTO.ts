export default interface IReturnExceptionsForPriceDTO {
  id_appointment_price: string;
  date: Date;
  new_price: number;
  week_day: number;
  hour: number;
  id_court: string;
}
