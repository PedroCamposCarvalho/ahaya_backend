export interface IAppointmentMaterialsProps {
  id: string;
  id_hour: string;
  identifier: string;
  material: string;
  amount: number;
  price: number;
  paid: boolean;
}

export interface IHoursProps {
  id: string;
  id_court: string;
  start_date: Date;
  finish_date: Date;
  number_of_players: number;
  court_name: string;
}

export interface IAppointmentProps {
  id_sport: string;
  sport_name: string;
  finalPrice: number;
  id_transaction: string;
  id_user: string;
  user_name: string;
  email: string;
  id_place: string;
  paid: boolean;
  priceToPay: number;
  winningPoints: number;
  points: number;
}

export default interface ICreateAppointmentDTO {
  appointment: IAppointmentProps;
  hours: IHoursProps[];
  materials: IAppointmentMaterialsProps[];
}
