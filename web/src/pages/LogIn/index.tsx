import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { Container, Content, Title } from './styles';
import Input from '../../components/Input';
import logo from '../../assets/wallet.svg';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import getValidationErrors from '../../utils/getValidationErrors';

interface FormData {
  email: string;
  password: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { logIn } = useAuth();
  const history = useHistory();

  const getFormatErrors = useCallback(async (formData: FormData): Promise<
    object
  > => {
    const validator = Yup.object().shape({
      email: Yup.string()
        .required('e-mail é obrigatório')
        .email('Informe um e-mail válido'),
      password: Yup.string().required('Senha é obritória'),
    });
    try {
      await validator.validate(formData, { abortEarly: false });
      return {};
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        return errors;
      }
      throw err;
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData): Promise<void> => {
      if (formRef.current) {
        const errors = await getFormatErrors(data);
        formRef.current.setErrors(errors);

        if (Object.length !== 0) {
          try {
            await logIn(data);
          } catch (error) {
            await api.post('users', data);
            await logIn(data);
          }
          history.push('/dashboard');
        }
      }
    },
    [getFormatErrors, history, logIn],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Title>Faça seu login/cadastro</Title>
          <Input name="email" icon={FiMail} type="email" placeholder="e-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="password"
          />
          <button type="submit">Entrar</button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
      </Content>
    </Container>
  );
};

export default LogIn;
