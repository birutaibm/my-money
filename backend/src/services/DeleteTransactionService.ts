import { getCustomRepository } from 'typeorm';

import Transactions from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface TransactionDeletionDTO {
  user_id: string;
  id: string;
}

class DeleteTransactionService {
  public async execute({ user_id, id }: TransactionDeletionDTO): Promise<void> {
    const repository = getCustomRepository(Transactions);
    const transaction = await repository.findOne(id);
    if (!transaction || transaction.user_id !== user_id) {
      throw new AppError('Transaction not found', 404);
    } else {
      await repository.delete(id);
    }
  }
}

export default DeleteTransactionService;
