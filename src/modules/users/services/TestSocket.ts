import { injectable, inject } from 'tsyringe';
import { io } from 'socket.io-client';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateNotificationIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<void> {
    const socket = await io('ws://192.168.15.3:3000');
    socket.connect();
    console.log(socket.connected);
    socket.send('imprimir azul');
  }
}

export default UpdateNotificationIdService;
