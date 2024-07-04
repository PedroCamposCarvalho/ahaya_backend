export default interface ICreateExperimentalClassUsersDTO {
  id_experimental_class: string;

  id_user: string;

  paid: boolean;

  observation: string;

  paid_price: number;

  id_transaction: string;

  material_amount: number;
}
