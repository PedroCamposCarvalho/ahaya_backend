export default interface ICreateEventUserDTO {
  id?: string;

  id_event: string;

  id_user: string;

  paid: boolean;

  observation: string;

  paid_price: number;

  id_transaction: string;

  material_amount: number;
}
