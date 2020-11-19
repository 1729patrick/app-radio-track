import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '~/screens/Home';
import Search from '~/screens/Search';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleGuide from '~/utils/StyleGuide';
import { View } from 'react-native';
import TabBar from '~/components/TabBar';

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, color, size }) => {
        //     let iconName;

        //     if (route.name === 'Home') {
        //       iconName = focused ? 'home' : 'home-outline';

        //       return <Icon name={iconName} size={size} color={color} />;
        //     } else if (route.name === 'Search') {
        //       iconName = focused ? 'ios-list-box' : 'ios-list';

        //       return (
        //         <Ionicons name="md-search-outline" size={size} color={color} />
        //       );
        //     }

        //     // You can return any component that you like here!
        //   },
        // })}
        // tabBarOptions={{
        //   keyboardHidesTabBar: true,
        //   activeTintColor: StyleGuide.palette.primary,
        //   inactiveTintColor: StyleGuide.palette.secondary,
        //   tabStyle: {
        //     justifyContent: 'center',
        //   },
        //   labelStyle: {
        //     ...StyleGuide.typography.tabBarLabel,
        //     marginBottom: 5,
        //   },
        //   iconStyle: { marginTop: 5 },
        //   style: {
        //     height: 55,
        //     backgroundColor: StyleGuide.palette.backgroundPrimary,
        //     borderTopColor: StyleGuide.palette.primary,
        //   },
        // }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{ title: 'Explorar' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
