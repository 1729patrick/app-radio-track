import React, { useMemo } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import StyleGuide from '~/utils/StyleGuide';
import Header from '~/components/Header';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';

import Favorites from './components/Favorites';
import { useSharedValue } from 'react-native-reanimated';
import TabBar from '~/components/TabBar/top';

const LibraryTab = createMaterialTopTabNavigator();

const Library = () => {
  const translateY = useSharedValue(0);

  const FavoritesWithScrollHandler = useMemo(() => {
    return () => <Favorites translateY={translateY} />;
  }, []);

  return (
    <>
      <Header
        translateY={translateY}
        showBack={false}
        backgroundColor={StyleGuide.palette.backgroundPrimary}
      />
      <LibraryTab.Navigator
        tabBar={(props) => <TabBar {...props} translateY={translateY} />}
        // tabBarOptions={{
        //   activeTintColor: StyleGuide.palette.primary,
        //   inactiveTintColor: StyleGuide.palette.secondary,
        //   labelStyle: {
        //     ...StyleGuide.typography.tabBarLabel,
        //   },
        //   indicatorStyle: { backgroundColor: StyleGuide.palette.primary },
        //   tabStyle: { alignItems: 'flex-start' },
        //   style: {
        //     marginTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
        //     backgroundColor: StyleGuide.palette.backgroundPrimary,
        //   },
        // }}
      >
        <LibraryTab.Screen
          name="Favorites"
          component={FavoritesWithScrollHandler}
          options={{ title: 'Favoritas' }}
        />
        <LibraryTab.Screen
          name="History"
          component={FavoritesWithScrollHandler}
          options={{ title: 'Histórico' }}
        />
      </LibraryTab.Navigator>
    </>
  );
};

export default Library;
