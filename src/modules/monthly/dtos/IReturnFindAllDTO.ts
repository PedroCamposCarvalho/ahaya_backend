export interface IAppointmentProps {
  id: string;

  start_date: Date;
}

export default interface IReturnFindAllDTO {
  id: string;

  id_court: string;

  court_name: string;

  id_user: string;

  week_day: number;

  hour: number;

  price: number;

  sandbox_product: number;

  production_product: number;

  appointmentInDay: IAppointmentProps;
}
