export default interface IUpdateUserPayerDTO {
  id_user: string;
  type: string;
  due_date: Date;
  packages: number;
  in_use: boolean;
}
