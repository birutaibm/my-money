import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

type User = object;

interface AuthState {
  token: string;
  user: User;
}

interface SignInInputDTO {
  email: string;
  password: string;
}

type SignInOutputDTO = Promise<void>;

interface AuthResponseDTO {
  token: string;
  user: User;
}

interface AuthContext {
  user: User;
  loading: boolean;
  signIn(input: SignInInputDTO): SignInOutputDTO;
  signOut(): void;
}

const Context = createContext<AuthContext>({} as AuthContext);

export function useAuth(): AuthContext {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export const AuthProvider: React.FC = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@MyMoney:token',
        '@MyMoney:user',
      ]);

      if (token[1] && user[1]) {
        setData({token: token[1], user: JSON.parse(user[1])});
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post<AuthResponseDTO>('sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    await AsyncStorage.multiSet([
      ['@MyMoney:token', token],
      ['@MyMoney:user', JSON.stringify(user)],
    ]);

    setData({token, user});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@MyMoney:token', '@MyMoney:user']);

    setData({} as AuthState);
  }, []);

  return (
    <Context.Provider value={{user: data.user, loading, signIn, signOut}}>
      {children}
    </Context.Provider>
  );
};
