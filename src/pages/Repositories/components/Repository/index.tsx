import React from 'react';

import {
  Feather,
  MaterialCommunityIcons
} from '@expo/vector-icons';

import {
  Dot,
  Title,
  Content,
  LightText,
  Container,
  IconsContainer,
  StarsLightText,
  TitleContainer,
  StarIconContainer,
  LockIconContainer
} from './styles';

export interface IRepository {
  id: number;
  name: string;
  private: boolean;
  description: string;
  stargazers_count: number;
}

const Repository: React.FC<{data: IRepository}> = ({ data }) => {
  return (
    <Container>
      <TitleContainer>
        <Dot />
        <Title>{data.name}</Title>
      </TitleContainer>

      <Content>
        {
          data.description &&
          <LightText>{data.description}</LightText>
        }

        <IconsContainer>
          <StarIconContainer>
            <MaterialCommunityIcons name="star-outline" size={22} color="#FFCE00" />
            <StarsLightText>{data.stargazers_count}</StarsLightText>
          </StarIconContainer>
          
          <LockIconContainer>
            {
              data.private ?
                <Feather name="lock" size={18} color="#CC042A" />
              :
                <Feather name="unlock" size={18} color="#63BF1F" />
            }
          </LockIconContainer>
        </IconsContainer>
      </Content>
    </Container>
  );
}

export default Repository;