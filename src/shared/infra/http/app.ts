import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import Socket, { Server as SocketServer } from 'socket.io';
import http, { Server } from 'http';
import '@shared/infra/typeorm';
import '@shared/container';
import schedules from '@modules/schedules';
import routes from './routes';

interface IConnectedUsers {
  [key: string]: string;
}

class App {
  public app: any;

  public server: Server;

  public io: SocketServer;

  public connectedUsers: IConnectedUsers = {};

  public schedules: any = schedules;

  constructor() {
    this.app = express();

    this.server = new http.Server(this.app);

    this.socket();

    this.middlewares();

    this.routes();

    this.exceptionHandler();

    this.schedules();

    this.connectedUsers = {};
  }

  socket(): void {
    this.io = Socket(this.server, {
      cors: {
        origin: 'http://localhost:8888',
      },
    });

    this.io.on('connection', socket => {
      const { id_user } = socket.handshake.query;

      this.connectedUsers[id_user] = socket.id;

      socket.on('desconnect', () => {
        delete this.connectedUsers[id_user];
      });
    });
  }

  middlewares(): void {
    const imgsFolder = path.resolve(__dirname, '..', '..', 'assets');
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/files', express.static(uploadConfig.uploadsFolder));
    this.app.use('/imgs', express.static(imgsFolder));
    this.app.use((request: Request, response: Response, next: NextFunction) => {
      request.io = this.io;
      request.connectedUsers = this.connectedUsers;
      next();
    });
  }

  routes(): void {
    this.app.use(routes);
  }

  exceptionHandler(): void {
    this.app.use(errors());

    this.app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
        }

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }
}

export default new App().server;
