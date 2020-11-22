import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #1F1F1F;
  padding: 15px;
`;

export const Content = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  z-index: -1;
  color: #FFF;
  font-size: 17px;
  font-weight: 600;
  position: absolute;
  width: 100%;
  text-align: center;
`;

export const Button = styled.TouchableOpacity`
  padding: 5px;
`;