import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';

interface InputDTO {
  email: string;
  password: string;
}

interface OutputDTO {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class UserCreator {
  private repository = getRepository(User);

  async execute({ email, password }: InputDTO): Promise<OutputDTO> {
    const existent = await this.repository.findOne({
      where: { email },
    });
    if (existent) {
      throw new AppError('This user is already registered');
    }
    const hashedPassword = await hash(password, 8);
    const user = this.repository.create({ email, password: hashedPassword });
    await this.repository.save(user);
    return user;
  }
}
