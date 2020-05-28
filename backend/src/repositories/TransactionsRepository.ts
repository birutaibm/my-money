import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async findByUserId(user_id: string): Promise<Transaction[]> {
    return this.find({
      where: { user_id },
    });
  }

  public async getBalance(user_id: string): Promise<Balance> {
    const transactions = await this.find({
      where: { user_id },
    });
    const result = transactions.reduce(
      (balance, transaction) => {
        let { income, outcome, total } = balance;
        if (transaction.type === 'income') {
          income += transaction.value;
          total += transaction.value;
        } else {
          outcome += transaction.value;
          total -= transaction.value;
        }
        return { income, outcome, total };
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return result;
  }
}

export default TransactionsRepository;
