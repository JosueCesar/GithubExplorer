import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import Profile from '../pages/Profile';
import Followers from '../pages/Followers';
import Following from '../pages/Following';
import Repositories from '../pages/Repositories';
import VisitProfile from '../pages/VisitProfile';

const Tab = createBottomTabNavigator();
const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#A5A5A5',
        labelStyle: {
          fontSize: 15,
        },
        tabStyle: {
          marginTop: 10,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        style: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
      initialRouteName="Profile"
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Repositories"
        component={Repositories}
        options={{
          tabBarLabel: 'Repos',
          tabBarIcon: ({ size, color }) => <Feather name="github" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Followers"
        component={FollowersNavigation}
        options={{
          tabBarLabel: 'Seguidores',
          tabBarIcon: ({ size, color }) => <Feather name="users" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Following"
        component={FollowingNavigation}
        options={{
          tabBarLabel: 'Seguindo',
          tabBarIcon: ({ size, color }) => <Feather name="users" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

const FollowersNavigation: React.FC = () => (
  <App.Navigator
    initialRouteName="Followers"
    screenOptions={{
      headerShown: false,
    }}
  >
    <App.Screen name="Followers" component={Followers} />
    <App.Screen name="VisitProfile" component={VisitProfile} />
  </App.Navigator>
);

const FollowingNavigation: React.FC = () => (
  <App.Navigator
    initialRouteName="Followers"
    screenOptions={{
      headerShown: false,
    }}
  >
    <App.Screen name="Following" component={Following} />
    <App.Screen name="VisitProfile" component={VisitProfile} />
  </App.Navigator>
);

export default AppRoutes;