import path from 'path';
import fs from 'fs';
import csv from 'csv-parse';

import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import CreateTransactionService from './CreateTransactionService';

type KeyValueMap = { [key: string]: string };

interface TransactionCreationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

const requiredFields = ['title', 'value', 'type', 'category'];

class ImportTransactionsService {
  private async parseCsv(
    fileContent: Buffer,
  ): Promise<TransactionCreationDTO[]> {
    return new Promise((resolve, reject) => {
      csv(fileContent, (err, lines, _) => {
        if (err) {
          reject(err);
        }
        const fieldNames: string[] = lines
          .shift()
          .map((name: string) => name.trim());
        const missingFields = requiredFields.filter(
          fieldName => !fieldNames.includes(fieldName),
        );
        if (missingFields.length) {
          throw new AppError(`Missing fields: ${missingFields.join(', ')}.`);
        }
        const records: KeyValueMap[] = lines.map(
          (line: string[], i: number) => {
            const record: KeyValueMap = {};
            line.forEach((value, j) => {
              record[fieldNames[j]] = value.trim();
            });
            if (record.type !== 'income' && record.type !== 'outcome') {
              throw new AppError(
                `Invalid transacion type "${record.type}" at line ${i + 2}`,
              );
            }
            return record;
          },
        );
        resolve(
          records.map(record => ({
            title: record.title,
            type: record.type === 'income' ? 'income' : 'outcome',
            category: record.category,
            value: Number(record.value),
          })),
        );
      });
    });
  }

  async execute(fileName: string): Promise<Transaction[]> {
    const filePath = path.join(uploadConfig.directory, fileName);
    const fileContent = await fs.promises.readFile(filePath);
    const dtos = await this.parseCsv(fileContent);
    await fs.promises.unlink(filePath);
    const creator = new CreateTransactionService();
    const transactions: Transaction[] = [];
    for (let index = 0; index < dtos.length; index++) {
      const dto = dtos[index];
      // eslint-disable-next-line no-await-in-loop
      const transaction = await creator.execute(dto);
      transactions.push(transaction);
    }
    return transactions;
  }
}

export default ImportTransactionsService;
