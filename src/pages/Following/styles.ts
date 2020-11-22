import styled from 'styled-components/native';

export const TopSafeArea = styled.SafeAreaView`
  flex: 0;
  background-color: #1F1F1F;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #292929;
`;

export const Divisor = styled.View`
  border-top-width: 1px;
  border-top-color: #7070705A;
`;

export const ErrorMessage = styled.Text`
  width: 100%;
  background-color: #CC042A;
  color: #FFF;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
`;