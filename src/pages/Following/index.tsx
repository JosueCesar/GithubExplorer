import React, { useCallback, useEffect, useState } from 'react';
import Axios from 'axios';

import { useAuth } from '../../hooks/auth';
import Follower, { IFollower } from '../../components/Follower';

import { FlatList, RefreshControl } from 'react-native';
import Header from '../../components/Header';
import { Divisor, TopSafeArea, Container, ErrorMessage } from './styles';
import { useIsFocused } from '@react-navigation/native';

const Following: React.FC = () => {
  const [data, setData] = useState<IFollower[]>([] as IFollower[]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    handleFollowings({ fresh: true });
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
  
  const showError = useCallback(({ message }: { message: string }) => {
    setError(message);
    setErrorVisibility(true);
    
    setTimeout(() => { dismissError() }, 5000)
  }, [setError, setErrorVisibility, dismissError]);

  const handleFollowings = useCallback(async ({ fresh = false }: { fresh?: boolean }) => {
    if(loading) return;

    setLoading(true);

    if(fresh === true || page * 30 <= user.following) {
      const res = await Axios.get(user.following_url.split('{')[0] + `?per_page=30&page=${fresh === true ? 1 : page + 1}`);
      
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
        <Header title="seguindo" number={user.following} />
        {
          errorVisibility &&
          <ErrorMessage>{error}</ErrorMessage>
        }

        <FlatList
          data={data}
          onEndReachedThreshold={0.3}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => handleFollowings({ fresh: true })}  />}
          onEndReached={() => handleFollowings({ fresh: false })}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item }) => <Follower data={item} />}
          ItemSeparatorComponent={() => <Divisor />}
        />
        
      </Container>
    </>
  );
}

export default Following;