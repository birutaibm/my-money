import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

interface InputDTO {
  email: string;
  password: string;
}

interface OutputDTO {
  user: User;
  token: string;
}

export default class UserAuthenticator {
  private repository = getRepository(User);

  private async getUser({ email, password }: InputDTO): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
    });
    if (!user) {
      throw new AppError('Invalid e-mail/password combination');
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new AppError('Invalid e-mail/password', 401);
    }
    return user;
  }

  async execute(data: InputDTO): Promise<OutputDTO> {
    const user = await this.getUser(data);
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, { subject: user.id, expiresIn });
    return { user, token };
  }
}
