export default interface ICreateClassUserDTO {
  id?: string;
  id_class: string;
  id_user: string;
  name: string;
  ssn: string;
  birth_date: Date;
  id_package?: string;
}
