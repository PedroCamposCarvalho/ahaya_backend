export default interface ICreateExperimentalClassDTO {
  id_place?: string;

  price: number;

  limit: number;

  start_date: Date;

  finish_date?: Date;
}
