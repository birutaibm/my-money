import { Router } from 'express';

import transactionsRouter from './transactions.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);

routes.use('/transactions', transactionsRouter);

export default routes;
