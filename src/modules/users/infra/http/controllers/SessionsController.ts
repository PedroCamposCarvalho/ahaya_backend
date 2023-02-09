import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token, firstLogin } = await authenticateUser.execute({
        email,
        password,
      });

      return response.json({ user: classToClass(user), token, firstLogin });
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  public async validateSession(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new AppError('Token not provided', 401);
    }

    const [, token] = authHeader.split(' ');
    try {
      const decoded = verify(token, authConfig.jwt.secret);
      const { sub } = decoded as ITokenPayload;
      request.user = {
        id: sub,
      };
      return response.json({ token: true });
    } catch {
      throw new AppError('Token invalid', 401);
    }
  }
}
