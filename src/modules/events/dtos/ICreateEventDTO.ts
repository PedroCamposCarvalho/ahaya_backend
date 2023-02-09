export default interface ICreateEventDTO {
  title: string;

  price: number;

  limit: number;

  start_date: Date;

  finish_date: Date;

  courts: string[];
}
