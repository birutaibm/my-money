import { Router } from 'express';

import UserCreator from '../services/UserCreator';

const route = Router();

route.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await new UserCreator().execute({ email, password });
    delete user.password;
    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default route;
