import TeacherWeekClassUsers from '../infra/typeorm/entities/TeacherWeekClassUsers';

export default interface IReturnWeekClassDetailDTO {
  id_week: string;
  teacher_name: string;
  date: Date;
  limit: number;
  users?: TeacherWeekClassUsers[];
}
