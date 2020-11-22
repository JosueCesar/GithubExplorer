import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 22px 0;
`;

export const Dot = styled.View`
  background-color: #FFCE00;
  width: 20px;
  height: 42px;
  border-radius: 100px;
  left: -10px;
`;

export const ImageBorder = styled.View`
  border-radius: 100px;
  padding: 3px;
  background-color: #FFF;
  margin-left: 4px;
`;

export const Image = styled.Image`
  width: 61px;
  height: 61px;
  border-radius: 100px;
`;

export const UserName = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #FFF;
  padding: 0 16px;
`;

export const Button = styled.TouchableOpacity`
  margin-right: 14px;
  padding: 10px;
`;