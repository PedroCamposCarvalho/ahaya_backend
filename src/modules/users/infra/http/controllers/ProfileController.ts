import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateCustomerOneSignalIdService from '@modules/users/services/UpdateCustomerOneSignalIdService';
import white_label from '../../../../../white_label';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id });
    // delete user.password;
    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      name,
      email,
      ssn,
      cellphone,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      birth_date,
      gender,
    } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      ssn,
      cellphone,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      birth_date,
      gender,
    });

    return response.json(classToClass(user));
  }

  public async verifyAppVersion(
    request: Request,
    response: Response,
  ): Promise<Response> {
    if (String(process.env.UPDATE) === 'YES') {
      if (String(request.query.appVersion) === String(process.env.APPVERSION)) {
        return response.json({ ok: true });
      }
      return response.json({ ok: false });
    }
    return response.json({ ok: true });
  }

  public async appStoreUrl(
    request: Request,
    response: Response,
  ): Promise<Response> {
    if (String(request.query.platform) === 'ios') {
      return response.json({
        url: white_label().ios_store_url,
      });
    }
    return response.json({ url: white_label().android_strore_url });
  }

  public async appInMaintence(
    request: Request,
    response: Response,
  ): Promise<Response> {
    if (String(process.env.MAINTENCE) === 'YES') {
      return response.json({ ok: true });
    }
    return response.json({ ok: false });
  }

  public async updateCustomerOneSignalIdService(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_user, oneSignalId } = request.body;

    const updateCustomerOneSignalIdService = container.resolve(
      UpdateCustomerOneSignalIdService,
    );

    const user = await updateCustomerOneSignalIdService.execute(
      id_user,
      oneSignalId,
    );

    return response.json(user);
  }
}
