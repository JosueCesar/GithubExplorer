import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  TopSafeArea,
  LightText,
  BoldTitle,
  ButtonNumber,
  InfoValueContainer,
  InfoContainer,
  DescriptionContainer,
  Dot,
  TitleContainer,
  Image,
  ImageContainer,
  HeaderContainer,
  HeaderInfoContainer,
  BoldText,
  SaveButton,
  GoBackButton,
  Content,
  BioContainer,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { AuthState, useAuth } from '../../hooks/auth';

interface IVisitProfile {
  route: {
    params: {
      userName: string;
    }
  }
}

const VisitProfile: React.FC<IVisitProfile> = ({ route }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState<AuthState>({} as AuthState);
  const { getUser, signIn } = useAuth();

  useEffect(() => {
    handleUser();
  }, []);

  const handleUser = useCallback(async () => {
    const { userName } = route?.params;

    if(userName) {
      const userData = await getUser({ userName });
      setUser(userData);
    }
  }, [getUser, setUser]);

  return (
    <>
      <TopSafeArea />
      <Container>
        <Content>
          <HeaderContainer>
            <HeaderInfoContainer>
              <GoBackButton onPress={() => navigation.goBack()}>
                <Feather
                  name="arrow-left"
                  size={28}
                  color="#FFF"
                />
              </GoBackButton>

              <BoldText numberOfLines={1}>{user.login && `#${user.login}`}</BoldText>

              <SaveButton onPress={() => {
                navigation.navigate('Profile', { redirect: () => signIn({ userName: user.login }) });
              }}>
                <LightText>Salvar</LightText>
                
                <Feather
                  name="log-in"
                  size={24}
                  color="#5CBC29"
                  style={{
                    paddingLeft: 8,
                  }}
                />
              </SaveButton>
            </HeaderInfoContainer>

            <ImageContainer>
              <Image
                source={{ uri: user.avatar_url }}
                resizeMode="cover"
              />
            </ImageContainer>
          </HeaderContainer>

          <View>
            {
              user.name &&
              <TitleContainer>
                <Dot />
                <BoldTitle numberOfLines={1}>{user.name}</BoldTitle>
              </TitleContainer>
            }
            <DescriptionContainer>
              {
                user.email &&
                <LightText>{user.email}</LightText>
              }
              {
                user.location && 
                <LightText>{user.location}</LightText>
              }
            </DescriptionContainer>
          </View>

          <InfoContainer>
            <InfoValueContainer>
              <ButtonNumber numberOfLines={1}>{user.followers}</ButtonNumber>
              <LightText>Seguidores</LightText>
            </InfoValueContainer>

            <InfoValueContainer>
              <ButtonNumber numberOfLines={1}>{user.following}</ButtonNumber>
              <LightText>Seguindo</LightText>
            </InfoValueContainer>

            <InfoValueContainer>
              <ButtonNumber numberOfLines={1}>{user.public_repos}</ButtonNumber>
              <LightText>Repos</LightText>
            </InfoValueContainer>
          </InfoContainer>

          {
            user.bio &&
            <View>
              <TitleContainer>
                <Dot />
                <BoldTitle>Bio</BoldTitle>
              </TitleContainer>
              <BioContainer>
                <LightText>{user.bio}</LightText>
              </BioContainer>
            </View>
          }
        </Content>
      </Container>
    </>
  );
}

export default VisitProfile;