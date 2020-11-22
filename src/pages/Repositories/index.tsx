import React, { useCallback, useEffect, useState } from 'react';
import { IRepository } from './components/Repository';

import { useAuth } from '../../hooks/auth';
import Axios from 'axios';

import { FlatList, RefreshControl } from 'react-native';
import Header from '../../components/Header';
import Repository from './components/Repository';
import { TopSafeArea, Container, Divisor, ErrorMessage } from './styles';
import { useIsFocused } from '@react-navigation/native';

const Repositories: React.FC = () => {
  const [data, setData] = useState<IRepository[]>([] as IRepository[]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    handleRepositories({ fresh: true });
  }, []);
  
  useEffect(() => {
    if(isFocused) {
      setPage(0);
    }
  }, [user]);

  const dismissError = useCallback(() => {
    setErrorVisibility(false);
    setError('');
  }, [setErrorVisibility, setError]);
  
  const showError = useCallback(async ({ message }: { message: string }) => {
    setError(message);
    setErrorVisibility(true);
    
    setTimeout(() => { dismissError() }, 5000)
  }, [setError, setErrorVisibility, dismissError]);

  const handleRepositories = useCallback(async ({ fresh = false }: { fresh?: boolean }) => {
    if(loading) return;

    setLoading(true);

    if(fresh === true || page * 30 <= user.public_repos) {
      const res = await Axios.get(user.repos_url + `?per_page=30&page=${fresh === true ? 1 : page + 1}`);
      
      if(res.status === 200) {
        dismissError();
        
        fresh === true ? setData(res.data) : setData([ ...data, ...res.data ]);
        
        setPage(fresh === true ? 1 : page + 1);
      }
      else if(res.status === 403) {
        showError({ message: 'Limite de requisições excedido, tente novamente mais tarde!' });
      }
      else {
        showError({ message: 'Ocorreu um erro, verifique sua conexão com a internet!' });
      }
    }
    
    setLoading(false);
  }, [loading, setLoading, page, setData, setPage, user, dismissError, showError]);

  return (
    <>
      <TopSafeArea />
      <Container>
        <Header title="repositórios" number={user.public_repos} />
        {
          errorVisibility &&
          <ErrorMessage>{error}</ErrorMessage>
        }

        <FlatList
          data={data}
          onEndReachedThreshold={0.3}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => handleRepositories({ fresh: true })}  />}
          onEndReached={() => handleRepositories({ fresh: false })}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item }) => <Repository data={item} />}
          ItemSeparatorComponent={() => <Divisor />}
        />
        
      </Container>
    </>
  );
}

export default Repositories;