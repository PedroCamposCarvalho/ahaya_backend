export default interface ICreateVoucherDTO {
  id_sport: string;

  percentage: number;

  id_user: string;

  pix_url: string;

  pix_key: string;

  paid: boolean;

  price: string;

  observation: string;
}
