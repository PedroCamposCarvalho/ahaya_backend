export default interface ICreateTeacherClassDTO {
  id_teacher: string;
  id_court: string;
  id_sport: string;
  day_of_week: number;
  hour: number;
  price: number;
  limit: number;
  id_category: string;
}
