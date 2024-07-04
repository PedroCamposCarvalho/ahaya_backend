import { getRepository, Repository, MoreThan } from 'typeorm';
import { addDays, format } from 'date-fns';

import ITeacherRepository from '@modules/teachers/repositories/ITeacherRepository';
import AppError from '@shared/errors/AppError';

import Teacher from '../entities/Teacher';
import TeacherClass from '../entities/TeacherClass';
import TeacherClassUser from '../entities/TeacherClassUser';
import TeacherWeekClass from '../entities/TeacherWeekClass';
import TeacherWeekClassUsers from '../entities/TeacherWeekClassUsers';

import IFindHoursDTO from '../../../dtos/IFindHoursDTO';
import ICreateClassUserDTO from '../../../dtos/ICreateClassUserDTO';
import IUserTicketDTO from '../../../dtos/IUserTicketDTO';
import ITeachersClassesDTO from '../../../dtos/ITeachersClassesDTO';
import IReturnFindClassByIdDTO from '../../../dtos/IReturnFindClassByIdDTO';
import IUpdateTeacherClassDTO from '../../../dtos/IUpdateTeacherClassDTO';
import IReturnFindUserClassesDTO from '../../../dtos/IReturnFindUserClassesDTO';
import IReturnClassesForCalendarDTO from '../../../dtos/IReturnClassesForCalendarDTO';
import IReturnWeekClassDetailDTO from '../../../dtos/IReturnWeekClassDetailDTO';
import ICreateTeacherClassDTO from '../../../dtos/ICreateTeacherClassDTO';
import ICreateTeacherWeekClassDTO from '../../../dtos/ICreateTeacherWeekClassDTO';

class TeacherRepository implements ITeacherRepository {
  private ormRepository: Repository<Teacher>;

  private classRepository: Repository<TeacherClass>;

  private userRepository: Repository<TeacherClassUser>;

  private weekClassRepository: Repository<TeacherWeekClass>;

  private weekClassUserRepository: Repository<TeacherWeekClassUsers>;

  constructor() {
    this.ormRepository = getRepository(Teacher);
    this.classRepository = getRepository(TeacherClass);
    this.userRepository = getRepository(TeacherClassUser);
    this.weekClassRepository = getRepository(TeacherWeekClass);
    this.weekClassUserRepository = getRepository(TeacherWeekClassUsers);
  }

  public async findAvailableClassesByWeekNumber(
    week_number: number,
  ): Promise<IFindHoursDTO[]> {
    const classes = await this.classRepository.query(
      `select week.id, cla.id as id_class, spo.id as id_sport, spo.name as sport_name, week.id as id_week, cat.identifier as category, cat.strength as strength,cou.name as court_name, tea.name as teacher_name, cla.limit, cla.hour,tea.photo_url, cla.price, count(use.id) as users_in_list from teachers tea inner join teachers_classes cla on tea.id = cla.id_teacher inner join courts cou on cla.id_court = cou.id inner join sports spo on cla.id_sport = spo.id inner join teachers_week_classes week on cla.id = week.id_class inner join sports_categories cat on cla.id_category = cat.id left join teachers_week_classes_users use on week.id = use.id_week where EXTRACT(ISODOW FROM week.start_date) IN (${
        week_number === 0 ? 7 : week_number
      }) and week.start_date >= now() group by week.id, spo.id, spo.name,cla.id, week.id, cat.identifier,cat.strength, cou.name, tea.name, cla.limit, cla.hour,tea.photo_url, cla.price, week.start_date order by week.start_date desc`,
    );

    return classes;
  }

  public async findAllTeachers(): Promise<Teacher[]> {
    const teachers = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });
    return teachers;
  }

  public async findTeacherById(id_teacher: string): Promise<Teacher> {
    const teacher = await this.ormRepository.findOne({
      where: {
        id: id_teacher,
      },
    });

    if (!teacher) {
      throw new AppError('Teacher not found');
    }

    return teacher;
  }

  public async saveTeacher(teacher: Teacher): Promise<Teacher> {
    await this.ormRepository.save(teacher);
    return teacher;
  }

  public async updateDescription(
    id_teacher: string,
    description: string,
  ): Promise<Teacher> {
    const teacher = await this.ormRepository.findOne({
      where: {
        id: id_teacher,
      },
    });

    if (!teacher) {
      throw new AppError('Teacher not found');
    }

    teacher.description = description;

    await this.ormRepository.save(teacher);

    return teacher;
  }

  public async createTeacherClass(
    data: ICreateTeacherClassDTO,
  ): Promise<TeacherClass> {
    const {
      id_teacher,
      id_court,
      id_sport,
      day_of_week,
      hour,
      limit,
      price,
      id_category,
    } = data;

    const existingClass = await this.classRepository.findOne({
      where: {
        id_court,
        day_of_week,
        hour,
        id_category,
        id_sport,
      },
    });

    if (existingClass) {
      const teacher = await this.ormRepository.findOne({
        where: { id: existingClass.id_teacher },
      });
      throw new AppError(
        `Conflito de horário com o(a) professor(a) ${teacher?.name}`,
      );
    }

    const newTeacherClass = await this.classRepository.create({
      id_teacher,
      id_court,
      id_sport,
      day_of_week,
      hour,
      limit,
      price,
      id_category,
    });

    await this.classRepository.save(newTeacherClass);

    return newTeacherClass;
  }

  public async findTeacherClass(
    id_teacher: string,
  ): Promise<ITeachersClassesDTO[]> {
    const classes = await this.classRepository.query(
      `select cla.id, cla.id_teacher, cou.name as court_name, cla.id_court, cla.day_of_week, cla.hour, cla.price, cla.limit, count(use.id) as users_in_list from teachers_classes cla inner join courts cou on cla.id_court = cou.id left join  teachers_classes_users use on cla.id = use.id_class where cla.id_teacher = '${id_teacher}' group by cla.id, cla.id_teacher, cou.name, cla.id_court, cla.day_of_week, cla.hour, cla.price, cla.limit`,
    );
    return classes;
  }

  public async createClassUser(
    data: ICreateClassUserDTO,
  ): Promise<TeacherClassUser> {
    const newUser = await this.userRepository.create(data);

    await this.userRepository.save(newUser);

    const weekClasses = await this.weekClassRepository.find({
      where: { id_class: data.id_class, start_date: MoreThan(new Date()) },
    });

    weekClasses.map(async item => {
      const weekClassUser = await this.weekClassUserRepository.create({
        id_week: item.id,
        name: data.name,
        ssn: data.ssn,
        retrieved: false,
      });
      await this.weekClassUserRepository.save(weekClassUser);
      return null;
    });

    return newUser;
  }

  public async findUserTicker(ssn: string): Promise<IUserTicketDTO[]> {
    const tickets = await this.userRepository.query(
      `select use.id as id_user, cla.id, cla.day_of_week, cou.name as court_name, tea.name as teacher_name, cla.hour from teachers tea inner join teachers_classes cla on tea.id = cla.id_teacher inner join courts cou on cla.id_court = cou.id  inner join teachers_classes_users use on cla.id = use.id_class where use.ssn = '${ssn}'`,
    );

    return tickets;
  }

  public async findUsersByClass(id_class: string): Promise<TeacherClassUser[]> {
    const users = await this.userRepository.find({
      where: {
        id_class,
      },
    });

    return users;
  }

  public async findTicketById(id_ticket: string): Promise<TeacherClassUser> {
    const user = await this.userRepository.findOne({
      where: { id: id_ticket },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }

  public async updateUserTicket(
    data: ICreateClassUserDTO,
  ): Promise<TeacherClassUser> {
    const user = await this.userRepository.findOne({
      where: { id: data.id },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    user.id_class = data.id_class;
    user.id_user = data.id_user === '' ? '' : data.id_user;
    user.name = data.name;

    user.ssn = data.ssn;
    user.birth_date = data.birth_date;

    await this.userRepository.save(user);

    return user;
  }

  public async findClassesByHourAndWeekDay(
    week_number: number,
    hour: number,
  ): Promise<TeacherClass[]> {
    const classes = await this.classRepository.find({
      where: {
        hour,
        day_of_week: week_number,
      },
    });

    return classes;
  }

  public async createTeacher(name: string): Promise<Teacher> {
    const teacher = await this.ormRepository.create({ name });

    await this.ormRepository.save(teacher);

    return teacher;
  }

  public async createTeacherWeeksClasses(): Promise<void> {
    const allClasses = await this.classRepository.find();

    allClasses.map(async item => {
      const today = new Date();

      const users = await this.userRepository.find({
        where: { id_class: item.id },
      });

      const weekClass = await this.weekClassRepository.create({
        id_class: item.id,
        start_date: new Date(
          today.setDate(
            today.getDate() +
              ((Number(item.day_of_week) + 7 - today.getDay()) % 7),
          ),
        ),
      });

      await this.weekClassRepository.save(weekClass);

      users.map(async item2 => {
        const user = await this.weekClassUserRepository.create({
          id_week: weekClass.id,
          name: item2.name,
          ssn: item2.ssn,
        });

        await this.weekClassUserRepository.save(user);
      });
    });
  }

  public async createWeekClassUser(
    id: string,
    name: string,
    ssn: string,
  ): Promise<TeacherWeekClassUsers> {
    const existingUser = await this.weekClassUserRepository.findOne({
      where: { id_week: id, ssn },
    });
    if (existingUser) {
      throw new AppError('Você já está nessa aula!');
    }
    const classUser = await this.weekClassUserRepository.create({
      id_week: id,
      name,
      ssn,
    });

    await this.weekClassUserRepository.save(classUser);

    return classUser;
  }

  public async cancelClass(
    id_classuser: string,
  ): Promise<TeacherWeekClassUsers> {
    const teacher_class_user = await this.weekClassUserRepository.findOne({
      id: id_classuser,
    });

    if (!teacher_class_user) {
      throw new AppError('User class not found');
    }

    teacher_class_user.canceled = true;

    await this.weekClassUserRepository.save(teacher_class_user);

    return teacher_class_user;
  }

  public async retrieveTicket(
    id_classuser: string,
  ): Promise<TeacherWeekClassUsers> {
    const teacher_class_user = await this.weekClassUserRepository.findOne({
      id: id_classuser,
    });

    if (!teacher_class_user) {
      throw new AppError('User class not found');
    }

    // if (teacher_class_user.retrieved === true) {
    //   throw new AppError('Ticket already retrieved');
    // }

    teacher_class_user.retrieved = !teacher_class_user.retrieved;

    await this.weekClassUserRepository.save(teacher_class_user);

    return teacher_class_user;
  }

  public async findUsersWeekClasses(
    ssn: string,
  ): Promise<TeacherWeekClassUsers[]> {
    const users = await this.weekClassUserRepository.find({ where: { ssn } });

    return users;
  }

  public async findUsersClasses(
    ssn: string,
  ): Promise<IReturnFindUserClassesDTO[]> {
    const users = await this.userRepository.query(
      `select use.id, cla.id as id_teacherclass, tea.name as teacher_name, cla.day_of_week, cla.hour, cla.price from teachers_classes_users use inner join teachers_classes cla on use.id_class = cla.id inner join teachers tea on cla.id_teacher = tea.id where use.ssn = '${ssn}'`,
    );

    return users;
  }

  public async findClassById(
    id_class: string,
  ): Promise<IReturnFindClassByIdDTO> {
    const teacherClass = await this.classRepository.query(
      `select cla.id, cla.id_teacher, cou.name as court_name,  cla.id_court, cla.day_of_week, cla.hour, cla.price, cla.limit, cla.id_category, cat.id_sport from teachers_classes cla inner join sports_categories cat on cla.id_category = cat.id inner join courts cou on cla.id_court = cou.id where cla.id = '${id_class}'`,
    );

    if (!teacherClass) {
      throw new AppError('Class not found');
    }

    return teacherClass[0];
  }

  public async updateTeacherClass(
    data: IUpdateTeacherClassDTO,
  ): Promise<TeacherClass> {
    const { id, id_court, day_of_week, hour, limit, price, id_category } = data;

    const teacherClass = await this.classRepository.findOne({ where: { id } });

    if (!teacherClass) {
      throw new AppError('Class not found');
    }

    teacherClass.id_court = id_court;
    teacherClass.day_of_week = day_of_week;
    teacherClass.hour = hour;
    teacherClass.limit = limit;
    teacherClass.price = price;
    teacherClass.id_category = id_category;

    await this.classRepository.save(teacherClass);

    return teacherClass;
  }

  public async findAllWeekClasses(): Promise<IReturnClassesForCalendarDTO[]> {
    const classes = await this.ormRepository.query(
      `select week.id as id_week, cla.id_court, week.start_date, tea.name as teacher_name from teachers_week_classes week inner join teachers_classes cla on week.id_class = cla.id inner join teachers tea on cla.id_teacher = tea.id`,
    );

    return classes;
  }

  public async findAllClasses(): Promise<TeacherClass[]> {
    const classes = await this.classRepository.find();
    return classes;
  }

  public async findWeekClassDetails(
    id_week: string,
  ): Promise<IReturnWeekClassDetailDTO> {
    const weekClass = await this.classRepository.query(
      `select week.id as id_week, tea.name as teacher_name, week.start_date as date, cla.limit from teachers_week_classes week inner join teachers_classes cla on week.id_class = cla.id inner join teachers tea on cla.id_teacher = tea.id where week.id = '${id_week}'`,
    );

    return weekClass[0];
  }

  public async findWeekClassUsers(
    id_week: string,
  ): Promise<TeacherWeekClassUsers[]> {
    const users = await this.weekClassUserRepository.find({
      where: { id_week },
      order: { name: 'ASC' },
    });

    return users;
  }

  public async findThisWeekClasses(): Promise<TeacherWeekClass[]> {
    const today = new Date();
    const todayPlus7 = addDays(today, 7);
    const classes = await this.weekClassRepository.query(
      `select * from teachers_week_classes where start_date::date >= '${format(
        today,
        'yyyy-MM-dd',
      )}' and start_date::date <= '${format(todayPlus7, 'yyyy-MM-dd')}'`,
    );

    return classes;
  }

  public async createWeekClass(
    data: ICreateTeacherWeekClassDTO,
  ): Promise<TeacherWeekClass> {
    const { id_class, start_date } = data;
    const teacherWeekClass = await this.weekClassRepository.create({
      id_class,
      start_date,
    });
    await this.weekClassRepository.save(teacherWeekClass);
    const users = await this.userRepository.find({
      where: { id_class: teacherWeekClass.id_class },
    });

    users.map(async item2 => {
      const user = await this.weekClassUserRepository.create({
        id_week: teacherWeekClass.id_class,
        name: item2.name,
        ssn: item2.ssn,
      });

      await this.weekClassUserRepository.save(user);
    });
    return teacherWeekClass;
  }

  public async removeUserFromClass(
    id_user: string,
    id_class: string,
  ): Promise<boolean> {
    const userClass = await this.userRepository.findOne({
      where: { id_class },
    });

    if (!userClass) {
      throw new AppError('User class not found');
    }
    await this.userRepository.remove(userClass);

    return true;
  }

  public async findAllClassesUsers(): Promise<TeacherWeekClassUsers[]> {
    const classUsers = await this.weekClassUserRepository.find();
    return classUsers;
  }
}
export default TeacherRepository;
