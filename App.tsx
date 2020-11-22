import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './src/hooks';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#292929" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#292929'}}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
}
