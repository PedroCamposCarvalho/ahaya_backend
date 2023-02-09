export default interface IEditAppointmentDTO {
  id: string;
  id_court: string;
  observation: string;
  start_date: Date;
  finish_date: Date;
  price: number;
  number_of_players: number;
}
