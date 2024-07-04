import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCreditCardService from '../../../../services/CreditCards/CreateCreditCardService';
import FindAllByUserService from '../../../../services/CreditCards/FindAllByUserService';
import DeleteCardService from '../../../../services/CreditCards/DeleteCardService';
import FindByFinalDigitsAndUserService from '../../../../services/CreditCards/FindByFinalDigitsAndUserService';

export default class CredidCardsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id_user, token, final_digits, flag } = request.body;

    const createCreditCard = container.resolve(CreateCreditCardService);
    const creditCard = await createCreditCard.execute({
      id_user,
      token,
      final_digits,
      flag,
    });

    return response.json(creditCard);
  }

  public async findByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_user } = request.query;

    const findByUser = container.resolve(FindAllByUserService);
    const creditCards = await findByUser.execute(String(id_user));

    return response.json(creditCards);
  }

  public async deleteCard(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_card } = request.query;

    const deleteCard = container.resolve(DeleteCardService);
    const creditCards = await deleteCard.execute(String(id_card));

    return response.json(creditCards);
  }

  public async findByFinalDigitsAndUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id_user, final_digits } = request.query;

    const findByFinalDigitsAndUser = container.resolve(
      FindByFinalDigitsAndUserService,
    );
    const creditCard = await findByFinalDigitsAndUser.execute(
      String(id_user),
      String(final_digits),
    );

    return response.json(creditCard);
  }
}
