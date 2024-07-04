export interface IClassUsersDTO {
  id: string;
  name: string;
  retrieved: boolean;
}

export interface IAppointmentDetailsDTO {
  price: number;
  id_transaction: string;
  canceled: boolean;
}

export default interface IReturnCalendarDTO {
  id: string;
  id_court: string;
  title: string;
  start: string;
  end: string;
  color: string;
  type: number;
  classUsers?: IClassUsersDTO[];
  appointmentDetail?: IAppointmentDetailsDTO;
}
