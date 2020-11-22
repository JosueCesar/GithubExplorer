import React, { useEffect } from 'react';
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
  ExitButton,
  Content,
  BioContainer,
} from './styles';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface IProfile {
  route: {
    params: {
      redirect?(): void;
    }
  }
}

const Profile: React.FC<IProfile> = ({ route }) => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const signIn = route?.params?.redirect;
    if(signIn) {
      signIn();
      delete route?.params?.redirect;
    }
  }, [route.params]);
  
  return (
    <>
      <TopSafeArea />
      <Container>
        <Content>
          <HeaderContainer>
            <HeaderInfoContainer>
              <BoldText numberOfLines={1}>{user.login && `#${user.login}`}</BoldText>

              <ExitButton onPress={() => signOut()}>
                <LightText>Sair</LightText>

                <Feather
                  name="log-out"
                  size={24}
                  color="#D03434"
                  style={{
                    paddingLeft: 8
                  }}
                />
              </ExitButton>
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
            <InfoValueContainer onPress={() => navigation.navigate('Followers')}>
              <ButtonNumber numberOfLines={1}>{user.followers}</ButtonNumber>
              <LightText>Seguidores</LightText>
            </InfoValueContainer>

            <InfoValueContainer onPress={() => navigation.navigate('Following')}>
              <ButtonNumber numberOfLines={1}>{user.following}</ButtonNumber>
              <LightText>Seguindo</LightText>
            </InfoValueContainer>

            <InfoValueContainer onPress={() => navigation.navigate('Repositories')}>
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

export default Profile;