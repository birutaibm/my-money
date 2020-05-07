import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';
import formatValue from '../../utils/formatValue';
import Header from '../../components/Header';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface TransactionInfo {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: string;
}

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const { token } = useAuth();

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get('transactions', {
        headers: { authorization: `Bearer ${token}` },
      });
      setTransactions(
        data.transactions.map((transaction: TransactionInfo) => {
          const date = new Date(transaction.created_at);
          const day = `0${date.getDate()}`.slice(-2);
          const month = `0${date.getMonth() + 1}`.slice(-2);
          const year = date.getFullYear();
          const formattedDate = `${day}/${month}/${year}`;
          const sign = transaction.type === 'outcome' ? '- ' : '';
          const formattedValue = sign + formatValue(transaction.value);
          return {
            ...transaction,
            created_at: date,
            category: { title: transaction.category.title },
            formattedValue,
            formattedDate,
          };
        }),
      );
      setBalance({
        income: formatValue(data.balance.income),
        outcome: formatValue(data.balance.outcome),
        total: formatValue(data.balance.total),
      });
    }

    loadTransactions();
  }, [token]);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
