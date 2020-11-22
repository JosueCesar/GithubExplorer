import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';
import { ActivityIndicator, View } from 'react-native';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if(loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return JSON.stringify(user) !== JSON.stringify({}) ?
    <AppRoutes /> : <AuthRoutes />;
};

export default Routes;