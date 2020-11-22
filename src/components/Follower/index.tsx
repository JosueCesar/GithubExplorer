import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Container, Dot, ImageBorder, Image, UserName, Button } from './styles';

export interface IFollower {
  id: number,
  avatar_url: string;
  login: string;
}

const Follower: React.FC<{ data: IFollower }> = ({ data }) => {
  const navigation = useNavigation();
  return (
    <Container>
      <Dot />

      <ImageBorder>
        <Image
          source={{ uri: data.avatar_url }}
          resizeMode="cover"
        />
      </ImageBorder>

      <UserName numberOfLines={1}>{`#${data.login}`}</UserName>

      <Button onPress={() => navigation.navigate('VisitProfile', { userName: data.login })}>
        <Feather name="arrow-right" size={24} color="#fff" />
      </Button>
    </Container>
  );
}

export default Follower;