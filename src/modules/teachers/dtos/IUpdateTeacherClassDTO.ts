export default interface ICreateTeacherClassDTO {
  id: string;
  id_teacher: string;
  id_court: string;
  day_of_week: number;
  hour: number;
  price: number;
  limit: number;
  id_category: string;
}
