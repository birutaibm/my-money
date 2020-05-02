import { getCustomRepository } from 'typeorm';

import Transations from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const repository = getCustomRepository(Transations);
    const transation = await repository.findOne(id);
    if (!transation) {
      throw new AppError('Transaction not found', 404);
    } else {
      await repository.delete(id);
    }
  }
}

export default DeleteTransactionService;
