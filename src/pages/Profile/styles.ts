import styled from 'styled-components/native';

export const TopSafeArea = styled.SafeAreaView`
  flex: 0;
  background-color: #1F1F1F;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #292929;
`;

export const BoldTitle = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #FFF;
  margin-left: 4px;
  max-width: 92%;
`;

export const LightText = styled.Text`
  font-size: 18px;
  font-weight: 300;
  color: #FFF;
`;

export const ButtonNumber = styled.Text`
  font-size: 40px;
  font-weight: 700;
  color: #FFF;
`;

export const InfoValueContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  background-color: #5252525D;
  padding: 16px 0;
  margin: 44px 0;
`;

export const DescriptionContainer = styled.View`
  margin: 0 24px;
`;

export const BioContainer = styled.View`
  margin: 0 24px 24px;
`;

export const Dot = styled.View`
  background-color: #FFCE00;
  width: 20px;
  height: 42px;
  border-radius: 100px;
  left: -10px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 112px;
  height: 112px;
  border-radius: 100px;
`;

export const ImageContainer = styled.View`
  border-radius: 100px;
  padding: 3px;
  background-color: #FFF;
  position: absolute;
  bottom: -57.5px;
`;

export const HeaderContainer = styled.View`
  background-color: #1F1F1F;
  align-items: center;
  padding-bottom: 60px;
  margin-bottom: 100px;
`;

export const HeaderInfoContainer = styled.View`
  flex-direction: row;
  padding: 25px 20px;
`;

export const BoldText = styled.Text`
  flex: 1;
  font-size: 17px;
  font-weight: 600;
  color: #FFF;
`;

export const ExitButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;