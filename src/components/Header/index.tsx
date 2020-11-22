import React from 'react';
import { Feather } from '@expo/vector-icons';

import { Container, Content, Title, Button } from './styles';
import { useNavigation } from '@react-navigation/native';

interface IHeader {
  title?: string;
  number?: number;
}

const Header: React.FC<IHeader> = ({ title, number }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <Content>
        <Button onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#FFF" />
        </Button>

        <Title numberOfLines={1}>{(
          `${
            number !== undefined &&
            number !== null ?
            number + ' ' : ''
          }${
            title !== undefined ?
            title : ''
          }`
        ).trim()}</Title>
      </Content>
    </Container>
  );
}

export default Header;