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
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useAd } from '~/ads/contexts/AdContext';

const LibraryTab = createMaterialTopTabNavigator();

const Library = () => {
  const translateY = useSharedValue(0);
  const historyRef = useRef<FlatList<RadioType>>(null);
  const favoritesRef = useRef<FlatList<RadioType>>(null);
  const isFocused = useIsFocused();
  const { showLibraryAd } = useAd();
  const { dangerouslyGetParent } = useNavigation();
  const isTabChangeRef = useRef(true);

  useEffect(() => {
    const { index } = dangerouslyGetParent()?.dangerouslyGetState() || {};

    if (index === 2 && isTabChangeRef.current) {
      isTabChangeRef.current = false;
      showLibraryAd();
    }

    if (!isFocused && index !== 2) {
      isTabChangeRef.current = true;
    }
  }, [dangerouslyGetParent, isFocused, showLibraryAd]);

  const FavoritesWithScrollHandler = useMemo(() => {
    return () => <Favorites ref={favoritesRef} />;
  }, []);

  const HistoryWithScrollHandler = useMemo(() => {
    return () => <History ref={historyRef} />;
  }, []);

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
