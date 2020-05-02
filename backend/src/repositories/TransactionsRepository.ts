import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
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
