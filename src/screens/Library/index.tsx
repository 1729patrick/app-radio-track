import React, { useCallback, useMemo, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import StyleGuide from '~/utils/StyleGuide';
import Header from '~/components/Header';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '~/components/Header/constants';

import Favorites from './components/Favorites';
import {
  useDerivedValue,
  useSharedValue,
  //@ts-ignore
  runOnJS,
} from 'react-native-reanimated';
import TabBar from '~/components/TabBar/top';
import Loader from '~/components/Loader';
import History from './components/History';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { RadioType } from '~/types/Station';

const LibraryTab = createMaterialTopTabNavigator();

const Library = () => {
  const translateY = useSharedValue(0);
  const historyRef = useRef<FlatList<RadioType>>(null);
  const favoritesRef = useRef<FlatList<RadioType>>(null);

  const refreshTranslateY = useCallback(
    (from) => {
      const offset = Math.max(Math.abs(translateY.value), 0);

      return;

      if (!offset || isNaN(offset)) {
        return;
      }

      if (from !== 'history') {
        historyRef.current?.scrollToOffset({
          offset,
          animated: false,
        });
      }
      if (from !== 'favorites') {
        favoritesRef.current?.scrollToOffset({
          offset,
          animated: false,
        });
      }
    },
    [translateY.value],
  );

  const FavoritesWithScrollHandler = useMemo(() => {
    return () => (
      <Favorites
        translateY={translateY}
        ref={favoritesRef}
        refreshTranslateY={refreshTranslateY}
      />
    );
  }, [refreshTranslateY, translateY]);

  const HistoryWithScrollHandler = useMemo(() => {
    return () => (
      <History
        translateY={translateY}
        ref={historyRef}
        refreshTranslateY={refreshTranslateY}
      />
    );
  }, [refreshTranslateY, translateY]);

  return (
    <>
      <Header
        translateY={translateY}
        showBack={false}
        backgroundColor={StyleGuide.palette.backgroundPrimary}
      />
      <LibraryTab.Navigator
        lazy
        lazyPlaceholder={Loader}
        springVelocityScale={1}
        tabBar={(props) => <TabBar {...props} translateY={translateY} />}>
        <LibraryTab.Screen
          name="Favorites"
          component={FavoritesWithScrollHandler}
          options={{ title: 'Favoritas' }}
        />
        <LibraryTab.Screen
          name="History"
          component={HistoryWithScrollHandler}
          options={{ title: 'Histórico' }}
        />
      </LibraryTab.Navigator>
    </>
  );
};

export default Library;
