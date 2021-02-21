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
import Profile from '~/screens/Profile';
import TermsAndConditions from '~/screens/Profile/screens/TermsAndConditions';
import PolicyPrivacy from '~/screens/Profile/screens/PolicyPrivacy';
import StyleGuide, { palette } from '~/utils/StyleGuide';
import { useTheme } from '~/contexts/ThemeContext';

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

const dark = {
  dark: true,
  colors: {
    primary: palette.dark.primary,
    background: palette.dark.background,
    card: palette.dark.backgroundPrimary,
    text: palette.dark.primary,
    border: palette.dark.border,
    notification: palette.dark.background,
  },
};

const light = {
  dark: false,
  colors: {
    primary: palette.light.primary,
    background: palette.light.background,
    card: palette.light.backgroundPrimary,
    text: palette.light.primary,
    border: palette.light.border,
    notification: palette.light.background,
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

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={options}
      />
      <ProfileStack.Screen
        name="PolicyPrivacy"
        component={PolicyPrivacy}
        options={options}
      />
    </ProfileStack.Navigator>
  );
}

const Routes = () => {
  const { mode } = useTheme();

  return (
    <NavigationContainer theme={mode === 'dark' ? dark : light}>
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
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          // options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(Routes);
