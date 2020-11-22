import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';

import { AntDesign } from '@expo/vector-icons';
import { Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Container, TextInputContainer, TextInput, ErrorText, Button, ButtonText } from './styles';

const LogIn: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const [errorVisibility, setErrorVisibility] = useState(false);
  const { signIn, loading } = useAuth();

  const showError = useCallback(({ message }: { message: string }) => {
    setErrorVisibility(true);
    setError(message);

    setTimeout(() => {
      setError('');
      setErrorVisibility(false);
    }, 5000);
  }, [setErrorVisibility, setError]);

  const handleSubmit = useCallback(async () => {
    if(!loading) {
      if(!userName) {
        showError({ message: 'Campo obrigatório' });
        return;
      }

      const res = await signIn({ userName });

      if(res instanceof Error) {
        if(res.message === 'BadInput') {
          showError({ message: 'Campo obrigatório' });
        } else {
          if(res.message.startsWith('Request failed')) {
            const status = Number(res.message.split(' ')[res.message.split(' ').length - 1]);
            
            if(status === 403) {
              showError({ message: 'limite de requisições por hora atingido!' });
            }
            else if(status === 404) {
              showError({ message: 'Usuário não encontrado!' });
            }
            else if(status === 500) {
              showError({ message: 'Erro na conexão!' });
            }
            else {
              showError({ message: 'Erro desconhecido!' });
            }
          }
        }
      }
    }
  }, [userName, signIn, loading, showError]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <AntDesign name="github" color="#FFCE00" size={100} />
        </View>

        <TextInputContainer>
          <TextInput
            placeholder="Usuário"
            placeholderTextColor="#535353"
            value={userName}
            onChangeText={text => setUserName(text)}
          />
          
          {
            errorVisibility &&
            <ErrorText>{error}</ErrorText>
          }
        </TextInputContainer>

        <Button onPress={() => handleSubmit()}>
          <ButtonText>ENTRAR</ButtonText>
          <AntDesign name="arrowright" size={24} style={styles.buttonIcon} />
        </Button>
      </ScrollView>
    </Container>
  );
}

export default LogIn;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonIcon: {
    paddingLeft: 10,
  }
});