import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import StyleGuide from '~/utils/StyleGuide';
import Header from '~/components/Header';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
const LibraryTab = createMaterialTopTabNavigator();

const Library = () => {
  const { translateY } = useAnimatedHeader();

  return (
    <>
      <Header
        translateY={translateY}
        showBack={false}
        backgroundColor={StyleGuide.palette.backgroundPrimary}
      />
      <LibraryTab.Navigator
        lazy
        tabBarOptions={{
          activeTintColor: StyleGuide.palette.primary,
          inactiveTintColor: StyleGuide.palette.secondary,
          labelStyle: { ...StyleGuide.typography.tabBarLabel },
          indicatorStyle: { backgroundColor: StyleGuide.palette.primary },
          style: {
            marginTop: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
            backgroundColor: StyleGuide.palette.backgroundPrimary,
          },
        }}>
        <LibraryTab.Screen
          name="Favorites"
          component={() => null}
          options={{ title: 'Favoritas' }}
        />
        <LibraryTab.Screen
          name="History"
          component={() => null}
          options={{ title: 'Histórico' }}
        />
      </LibraryTab.Navigator>
    </>
  );
};

export default Library;
