import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/screens/Home';
import Explore from '~/screens/Explore';

import TabBar from '~/components/TabBar';

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{ title: 'Explorar' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
