import * as React from 'react';

import Home from '../containers/home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

export enum ROUTES_NAMES {
  Home = "Home",
}

function Routes() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <Stack.Navigator initialRouteName={ROUTES_NAMES.Home}>
        <Stack.Screen options={{
          headerTitle: 'Unifacef App',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: 'black',
          }
        }} name={ROUTES_NAMES.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;