export default interface ICreateUserDTO {
  name: string;
  email: string;
  ssn: string;
  password: string;
  id_place: string;
  user_type: string;
  is_monthly: boolean;
  cellphone: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  notification_id: string;
  birth_date: Date;
  gender: string;
}
