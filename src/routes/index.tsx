import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import Home from '~/screens/Home';
import Explore from '~/screens/Explore';

import TabBar from '~/components/TabBar/Bottom';
import Playlist from '~/screens/Playlist';
import Search from '~/screens/Search';
import Library from '~/screens/Library';
import Welcome from '~/screens/Welcome';

const Tab = createBottomTabNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 6000,
    damping: 3000,
    mass: 0.5,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const options = {
  cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
  transitionSpec: {
    open: config,
    close: config,
  },
};

const theme = {
  dark: true,
  colors: {
    primary: '#000',
    background: '#000',
    card: '#000',
    text: '#000',
    border: '#000',
    notification: '#000',
  },
};

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Search" component={Search} options={options} />
      <HomeStack.Screen
        name="Playlist"
        component={Playlist}
        options={options}
      />
      <HomeStack.Screen name="Welcome" component={Welcome} options={options} />
    </HomeStack.Navigator>
  );
}

const ExploreStack = createStackNavigator();

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator headerMode="none">
      <ExploreStack.Screen name="Explore" component={Explore} />
      <HomeStack.Screen name="Search" component={Search} options={options} />
      <ExploreStack.Screen
        name="Playlist"
        component={Playlist}
        options={options}
      />
    </ExploreStack.Navigator>
  );
}

const LibraryStack = createStackNavigator();

function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator headerMode="none">
      <LibraryStack.Screen name="Library" component={Library} />
      <LibraryStack.Screen name="Search" component={Search} options={options} />
    </LibraryStack.Navigator>
  );
}

const AppScreen = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        // options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryStackScreen}
        // options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen
          name="Explore"
          component={ExploreStackScreen}
          // options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryStackScreen}
          // options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(Routes);
