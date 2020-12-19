import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import StyleGuide from '~/utils/StyleGuide';
import Header from '~/components/Header';

import Favorites from './components/Favorites';
import {
  useSharedValue,
  //@ts-ignore
} from 'react-native-reanimated';
import TabBar from '~/components/TabBar/Top';
import Loader from '~/components/Loader';
import History from './components/History';
import { FlatList } from 'react-native-gesture-handler';
import { RadioType } from '~/types/Station';
import { useIsFocused } from '@react-navigation/native';
import { useAd } from '~/ads/contexts/AdContext';

const LibraryTab = createMaterialTopTabNavigator();

const Library = () => {
  const translateY = useSharedValue(0);
  const historyRef = useRef<FlatList<RadioType>>(null);
  const favoritesRef = useRef<FlatList<RadioType>>(null);
  const isFocused = useIsFocused();
  const { showLibraryAd } = useAd();

  useEffect(() => {
    if (isFocused) {
      showLibraryAd();
    }
  }, [isFocused, showLibraryAd]);

  const refreshTranslateY = useCallback((from) => {
    // const offset = Math.max(Math.abs(translateY.value), 0);
    // if (!offset || isNaN(offset)) {
    //   return;
    // }
    // if (from !== 'history') {
    //   historyRef.current?.scrollToOffset({
    //     offset,
    //     animated: false,
    //   });
    // }
    // if (from !== 'favorites') {
    //   favoritesRef.current?.scrollToOffset({
    //     offset,
    //     animated: false,
    //   });
    // }
  }, []);

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

export default memo(Library);
