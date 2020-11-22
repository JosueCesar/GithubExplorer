import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export interface AuthState {
  login: string,
  name: string,
  email: string,
  location: string,
  company: string,
  bio: string,
  avatar_url: string,
  followers_url: string,
  following_url: string,
  repos_url: string,
  organizations_url: string,
  starred_url: string,
  public_repos: number,
  public_gists: number,
  followers: number,
  following: number,
}

interface AuthContextData {
  user: AuthState;
  loading: boolean;
  getUser(credentials: { userName: string }): Promise<AuthState>;
  signIn(credentials: { userName: string }): Promise<void | Error>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('@LUBYGITHUBEXPLORER:user');

      if(user) {
        setData(JSON.parse(user));
      }
    }

    getUser();
    setLoading(false);
  }, []);

  const signIn = useCallback(async ({ userName}: { userName: string }) => {
    setLoading(true);

    try {
      const res = await getUser({ userName });
  
      if(res) {
        setData(res);

        await AsyncStorage.setItem('@LUBYGITHUBEXPLORER:user', JSON.stringify(res));

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch(err) {
      setLoading(false);
      return err;
    }
  }, []);

  const signOut = useCallback(() => {
    setLoading(true);
    setData({} as AuthState);
    setLoading(false);
  }, []);

  const getUser = useCallback(async ({ userName }) => {
    if(userName) {
      const res = await api.get<AuthState>(`users/${userName}`);
      
      if(res.status === 200) {
        return res.data;
      } else {
        throw new Error(String(res.status));
      }
    } else {
      throw new Error('BadInput');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, loading, signIn, signOut, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used with a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };