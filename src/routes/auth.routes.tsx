import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from '../pages/LogIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name="Login" component={LogIn} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
