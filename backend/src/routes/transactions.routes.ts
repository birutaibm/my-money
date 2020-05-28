import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '../config/upload';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const user_id = request.user.id;
  const transactions = {
    transactions: await transactionsRepository.findByUserId(user_id),
    balance: await transactionsRepository.getBalance(user_id),
  };
  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const user_id = request.user.id;
  const transaction = await new CreateTransactionService().execute({
    user_id,
    title,
    value,
    type,
    category,
  });
  return response.status(201).json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const user_id = request.user.id;
  await new DeleteTransactionService().execute({ user_id, id });
  return response.sendStatus(204);
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const { filename } = request.file;
    const user_id = request.user.id;
    const transactions = await new ImportTransactionsService().execute({
      fileName: filename,
      user_id,
    });
    return response.status(201).json(transactions);
  },
);

export default transactionsRouter;
