import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import axios from 'axios';
import FindAvailableClassesByWeekNumberService from '@modules/teachers/services/FindAvailableClassesByWeekNumberService';
import FindAllTeachersService from '@modules/teachers/services/FindAllTeachersService';
import UpdateTeacherPhotoService from '@modules/teachers/services/UpdateTeacherPhotoService';
import FindTeacherByIdService from '@modules/teachers/services/FindTeacherByIdService';
import UpdateDescriptionService from '@modules/teachers/services/UpdateDescriptionService';
import CreateTeacherClass from '@modules/teachers/services/CreateTeacherClass';
import FindTeacherClassesService from '@modules/teachers/services/FindTeacherClassesService';
import CreateClassUserService from '@modules/teachers/services/CreateClassUserService';
import FindUserTicketsService from '@modules/teachers/services/FindUserTicketsService';
import FindUsersByClassService from '@modules/teachers/services/FindUsersByClassService';
import FindTicketByIdService from '@modules/teachers/services/FindTicketByIdService';
import UpdateUserTicketService from '@modules/teachers/services/UpdateUserTicketService';
import CreateTeacherService from '@modules/teachers/services/CreateTeacherService';
import CreateWeekClassUserService from '@modules/teachers/services/CreateWeekClassUserService';
import CancelClassService from '@modules/teachers/services/CancelClassService';
import RetrieveTicketService from '@modules/teachers/services/RetrieveTicketService';
import FindAvailableCourtsToCreateClassService from '@modules/teachers/services/FindAvailableCourtsToCreateClassService';
import FindClassByIdService from '@modules/teachers/services/FindClassByIdService';
import UpdateTeacherClassService from '@modules/teachers/services/UpdateTeacherClassService';
import FindUsersClassesService from '@modules/teachers/services/FindUsersClassesService';
import ScheduleCreateClassService from '@modules/teachers/services/ScheduleCreateClassService';
import FindWeekClassDetailsService from '@modules/teachers/services/FindWeekClassDetailsService';
import RemoveUserFromClassService from '@modules/teachers/services/RemoveUserFromClassService';

export default class TeacherController {
  public async scheduleCreateClassService(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const scheduleCreateClassService = container.resolve(
      ScheduleCreateClassService,
    );

    scheduleCreateClassService.execute();

    return response.json({ ok: true });
  }

  public async findAvailableCourtsToCreateClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAvailableCourtsToCreateClassService = container.resolve(
      FindAvailableCourtsToCreateClassService,
    );

    const { id_sport, day_of_week, hour } = request.query;

    const courts = await findAvailableCourtsToCreateClassService.execute({
      id_sport: String(id_sport),
      day_of_week: Number(day_of_week),
      hour: Number(hour),
    });

    return response.json(courts);
  }

  public async findAvailableClassesByWeekNumber(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { week_number, ssn, id_user } = request.query;

    const findAvailableClassesByWeekNumberService = container.resolve(
      FindAvailableClassesByWeekNumberService,
    );
    const classes = await findAvailableClassesByWeekNumberService.execute(
      Number(week_number),
      String(ssn),
      String(id_user),
    );

    return response.json(classToClass(classes));
  }

  public async findAllTeachers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findAllTeachersService = container.resolve(FindAllTeachersService);
    const teachers = await findAllTeachersService.execute();

    return response.json(classToClass(teachers));
  }

  public async updatePhoto(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateTeacherPhotoService);
    const { id_teacher } = request.query;
    const teacher = await updateUserAvatar.execute({
      id_teacher: String(id_teacher),
      photoFilename: request.file.filename,
    });

    return response.json(classToClass(teacher));
  }

  public async findTeacherById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findTeacherByIdService = container.resolve(FindTeacherByIdService);
    const { id_teacher } = request.query;
    const teacher = await findTeacherByIdService.execute(String(id_teacher));

    return response.json(classToClass(teacher));
  }

  public async updateDescription(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateDescriptionService = container.resolve(
      UpdateDescriptionService,
    );
    const { id_teacher, description } = request.body;
    const teacher = await updateDescriptionService.execute(
      id_teacher,
      description,
    );

    return response.json(classToClass(teacher));
  }

  public async createTeacherClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createTeacherClass = container.resolve(CreateTeacherClass);

    const teacherClass = await createTeacherClass.execute(request.body);

    return response.json({ teacherClass });
  }

  public async findTeacherClasses(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findTeacherClassesService = container.resolve(
      FindTeacherClassesService,
    );

    const teacherClass = await findTeacherClassesService.execute(
      String(request.query.id_teacher),
    );

    return response.json(teacherClass);
  }

  public async createUserClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createClassUserService = container.resolve(CreateClassUserService);

    const classUser = await createClassUserService.execute(request.body);

    request.io.emit('newUser');

    return response.json({ classUser });
  }

  public async findUserTickets(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUserTicketsService = container.resolve(FindUserTicketsService);

    const classUser = await findUserTicketsService.execute(
      String(request.query.ssn),
    );

    return response.json(classUser);
  }

  public async findClassUsers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUsersByClassService = container.resolve(FindUsersByClassService);

    const users = await findUsersByClassService.execute(
      String(request.query.id_class),
    );

    return response.json({ users });
  }

  public async findTicketById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findTicketByIdService = container.resolve(FindTicketByIdService);

    const user = await findTicketByIdService.execute(
      String(request.query.id_ticket),
    );

    return response.json({ user });
  }

  public async updateTicketUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserTicketService = container.resolve(UpdateUserTicketService);

    const user = await updateUserTicketService.execute(request.body);

    return response.json({ user });
  }

  public async createTeacher(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createTeacherService = container.resolve(CreateTeacherService);

    const teacher = await createTeacherService.execute(
      String(request.body.name),
    );

    return response.json(teacher);
  }

  public async createWeekClasses(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const scheduleCreateClassService = container.resolve(
      ScheduleCreateClassService,
    );

    await scheduleCreateClassService.execute();

    return response.json({ ok: true });
  }

  public async createWeekClassUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createWeekClassUserService = container.resolve(
      CreateWeekClassUserService,
    );

    const { id, name, ssn } = request.body;
    const classUser = await createWeekClassUserService.execute(id, name, ssn);
    request.io.emit('newUser');
    return response.json(classUser);
  }

  public async cancelClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const cancelClassService = container.resolve(CancelClassService);
    const { id_classuser } = request.query;
    const classUser = await cancelClassService.execute(String(id_classuser));

    return response.json(classToClass(classUser));
  }

  public async retrieveTicket(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const retrieveTicketService = container.resolve(RetrieveTicketService);

    const { id_classuser } = request.query;
    const classUser = await retrieveTicketService.execute(String(id_classuser));

    axios.get(`http://192.168.15.3:3000/spinWheel?color=blue`);

    request.io.emit('ticket_retrieved', { id_classuser });

    return response.json(classToClass(classUser));
  }

  public async findClassById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findClassByIdService = container.resolve(FindClassByIdService);
    const { id_class } = request.query;

    const teacherClass = await findClassByIdService.execute(String(id_class));

    return response.json(teacherClass);
  }

  public async updateTeacherClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateTeacherClassService = container.resolve(
      UpdateTeacherClassService,
    );

    const teacherClass = await updateTeacherClassService.execute(request.body);

    return response.json(teacherClass);
  }

  public async findUsersClasses(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findUsersClassesService = container.resolve(FindUsersClassesService);

    const { ssn } = request.query;

    const users = await findUsersClassesService.execute(String(ssn));

    return response.json(users);
  }

  public async findClassDetails(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_week } = request.query;

    const findWeekClassDetailsService = container.resolve(
      FindWeekClassDetailsService,
    );

    const classDetail = await findWeekClassDetailsService.execute(
      String(id_week),
    );

    return response.json(classDetail);
  }

  public async removeUserFromClass(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const removeUserFromClassService = container.resolve(
      RemoveUserFromClassService,
    );

    const { id_user, id_class } = request.query;

    const userClass = await removeUserFromClassService.execute(
      String(id_user),
      String(id_class),
    );

    // const ownerSocket = request.connectedUsers[String(id_user)];

    request.emit('class_removed');

    // if (ownerSocket) {
    //   request.io.to(ownerSocket).emit('class_removed');
    // }

    return response.json(userClass);
  }
}
