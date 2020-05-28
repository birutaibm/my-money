import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import User from '../models/User';

interface TransactionCreationDTO {
  user_id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  private async getOrCreateCategory(title: string): Promise<Category> {
    const repository = getRepository(Category);
    let category = await repository.findOne({ title });
    if (!category) {
      category = await repository.save(repository.create({ title }));
    }
    return category;
  }

  public async execute({
    user_id,
    title,
    value,
    type,
    category,
  }: TransactionCreationDTO): Promise<Transaction> {
    const users = getRepository(User);
    const user = await users.findOne(user_id);
    if (!user) {
      throw new AppError(
        'Something is wrong with your user, try to logout and login again',
      );
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);
    if (type === 'outcome') {
      const { total } = await transactionsRepository.getBalance(user_id);
      if (value > total) {
        throw new AppError(
          'You do not have money enought for this transaction',
        );
      }
    }

    const { id: category_id } = await this.getOrCreateCategory(category);

    return transactionsRepository.save(
      transactionsRepository.create({
        title,
        value,
        type,
        category_id,
        user_id,
      }),
    );
  }
}

export default CreateTransactionService;
