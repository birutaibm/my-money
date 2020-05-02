import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface TransactionCreationDTO {
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
    title,
    value,
    type,
    category,
  }: TransactionCreationDTO): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    if (type === 'outcome') {
      const { total: balance } = await transactionsRepository.getBalance();
      if (value > balance) {
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
      }),
    );
  }
}

export default CreateTransactionService;
