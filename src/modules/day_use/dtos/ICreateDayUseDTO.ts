export default interface ICreateAppointmentDTO {
  price: number;

  limit: number;

  start_date: Date;

  finish_date: Date;

  courts: string[];

  id_place: string;
}
