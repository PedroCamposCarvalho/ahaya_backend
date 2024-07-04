import Teacher from '../infra/typeorm/entities/Teacher';
import TeacherClass from '../infra/typeorm/entities/TeacherClass';
import TeacherClassUser from '../infra/typeorm/entities/TeacherClassUser';
import TeacherWeekClass from '../infra/typeorm/entities/TeacherWeekClass';
import TeacherWeekClassUsers from '../infra/typeorm/entities/TeacherWeekClassUsers';

import IFindHoursDTO from '../dtos/IFindHoursDTO';
import ICreateClassUserDTO from '../dtos/ICreateClassUserDTO';
import IUserTicketDTO from '../dtos/IUserTicketDTO';
import ITeachersClassesDTO from '../dtos/ITeachersClassesDTO';
import IReturnFindClassByIdDTO from '../dtos/IReturnFindClassByIdDTO';
import IUpdateTeacherClassDTO from '../dtos/IUpdateTeacherClassDTO';
import IReturnFindUserClassesDTO from '../dtos/IReturnFindUserClassesDTO';
import IReturnClassesForCalendarDTO from '../dtos/IReturnClassesForCalendarDTO';
import IReturnWeekClassDetailDTO from '../dtos/IReturnWeekClassDetailDTO';
import ICreateTeacherClassDTO from '../dtos/ICreateTeacherClassDTO';
import ICreateTeacherWeekClassDTO from '../dtos/ICreateTeacherWeekClassDTO';

export default interface IUserRepository {
  findAvailableClassesByWeekNumber(
    week_number: number,
  ): Promise<IFindHoursDTO[]>;
  findAllTeachers(): Promise<Teacher[]>;
  findTeacherById(id_teacher: string): Promise<Teacher>;
  saveTeacher(teacher: Teacher): Promise<Teacher>;
  updateDescription(id_teacher: string, description: string): Promise<Teacher>;
  createTeacherClass(data: ICreateTeacherClassDTO): Promise<TeacherClass>;
  findTeacherClass(id_teacher: string): Promise<ITeachersClassesDTO[]>;
  createClassUser(data: ICreateClassUserDTO): Promise<TeacherClassUser>;
  findUserTicker(ssn: string): Promise<IUserTicketDTO[]>;
  findUsersByClass(id_class: string): Promise<TeacherClassUser[]>;
  findTicketById(id_ticket: string): Promise<TeacherClassUser>;
  updateUserTicket(data: ICreateClassUserDTO): Promise<TeacherClassUser>;
  findClassesByHourAndWeekDay(
    week_number: number,
    hour: number,
  ): Promise<TeacherClass[]>;
  createTeacher(name: string): Promise<Teacher>;
  createTeacherWeeksClasses(): Promise<void>;
  createWeekClassUser(
    id: string,
    name: string,
    ssn: string,
  ): Promise<TeacherWeekClassUsers>;
  cancelClass(id_classuser: string): Promise<TeacherWeekClassUsers>;
  retrieveTicket(id_classuser: string): Promise<TeacherWeekClassUsers>;
  findUsersWeekClasses(ssn: string): Promise<TeacherWeekClassUsers[]>;
  findUsersClasses(ssn: string): Promise<IReturnFindUserClassesDTO[]>;
  findClassById(id_class: string): Promise<IReturnFindClassByIdDTO>;
  updateTeacherClass(data: IUpdateTeacherClassDTO): Promise<TeacherClass>;
  findAllWeekClasses(): Promise<IReturnClassesForCalendarDTO[]>;
  findAllClasses(): Promise<TeacherClass[]>;
  findWeekClassDetails(id_week: string): Promise<IReturnWeekClassDetailDTO>;
  findWeekClassUsers(id_week: string): Promise<TeacherWeekClassUsers[]>;
  findThisWeekClasses(): Promise<TeacherWeekClass[]>;
  createWeekClass(data: ICreateTeacherWeekClassDTO): Promise<TeacherWeekClass>;
  removeUserFromClass(id_user: string, id_class: string): Promise<boolean>;
  findAllClassesUsers(): Promise<TeacherWeekClassUsers[]>;
}
