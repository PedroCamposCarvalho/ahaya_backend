import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import routes from './routes';
import AppError from '../../errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

const imgsFolder = path.resolve(__dirname, '..', '..', 'assets');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/imgs', express.static(imgsFolder));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(8888, () => {
  console.log('Server started on port 8888');
});
