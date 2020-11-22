import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #292929;
`;

export const Content = styled.ScrollView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextInputContainer = styled.View`
  padding: 16px 20px;
  background-color: #FFF;
  border-radius: 12px;
  flex-direction: row;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 20px;
`;

export const ErrorText = styled.Text`
  color: #EB2D2D;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 20px;
  background-color: #FFCE00;
  border-radius: 12px;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;