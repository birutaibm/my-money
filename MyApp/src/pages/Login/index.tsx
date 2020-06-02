import React, {useCallback, useRef} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import {useAuth} from '../../hooks/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Title, ForgotPassword, ForgotPasswordText} from './styles';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passRef = useRef<TextInput>(null);
  const {signIn} = useAuth();
  const navigation = useNavigation();

  const getFormatErrors = useCallback(async (data: SignInFormData): Promise<
    object
  > => {
    const validator = Yup.object().shape({
      email: Yup.string()
        .required('e-mail é obrigatório')
        .email('Informe um e-mail válido'),
      password: Yup.string().required('Senha é obritória'),
    });
    try {
      await validator.validate(data, {abortEarly: false});
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
    async (data: SignInFormData) => {
      if (formRef.current) {
        const errors = await getFormatErrors(data);
        formRef.current.setErrors(errors);

        if (Object.keys(errors).length === 0) {
          try {
            await signIn(data);
            navigation.navigate('Dashboard');
          } catch (signInError) {
            try {
              await api.post('/users', data);
              await signIn(data);
              navigation.navigate('Dashboard');
            } catch (signUpError) {
              Alert.alert('Wrong password');
            }
          }
        }
      }
    },
    [getFormatErrors, signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <View>
              <Title>Faça seu login ou cadastro</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passRef.current?.focus()}
                name="email"
                icon="mail"
                placeholder="E-mail"
              />

              <Input
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                name="password"
                icon="lock"
                placeholder="Senha"
                ref={passRef}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
