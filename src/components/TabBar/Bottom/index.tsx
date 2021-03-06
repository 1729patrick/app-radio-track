import React, { memo, useCallback } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { usePlayer } from '~/contexts/PlayerContext';
import Player from '../../Player';

import getStyles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { COMPACT_HEIGHT, SNAP_POINTS } from '../../Player/constants';
import { BOTTOM_TAB_BAR_HEIGHT } from './constants';

import { ActiveCompass, InactiveCompass } from './Icons/Compass';
import { ActiveHome, InactiveHome } from './Icons/Home';
import { ActiveLibrary, InactiveLibrary } from './Icons/Library';
import { ActiveProfile, InactiveProfile } from './Icons/Profile';

import useStyles from '~/hooks/useStyles';
import { useTheme } from '~/contexts/ThemeContext';
import { STATES, useLocation } from '~/contexts/LocationContext';

const { width } = Dimensions.get('window');

const TABS = [
  {
    name: 'Home',
    title: 'Inicío',
    InactiveIcon: InactiveHome,
    ActiveIcon: ActiveHome,
  },
  {
    name: 'Explore',
    title: 'Explorar',
    InactiveIcon: InactiveCompass,
    ActiveIcon: ActiveCompass,
  },
  {
    name: 'Library',
    title: 'Biblioteca',
    InactiveIcon: InactiveLibrary,
    ActiveIcon: ActiveLibrary,
  },
  {
    name: 'Profile',
    title: 'Perfil',
    InactiveIcon: InactiveProfile,
    ActiveIcon: ActiveProfile,
  },
];

type TabBarProps = BottomTabBarProps<BottomTabBarOptions>;

const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const { regionId } = useLocation();
  const { playerRef, translateY } = usePlayer();
  const styles = useStyles(getStyles);
  const { palette } = useTheme();

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translateY.value,
            [SNAP_POINTS[0], SNAP_POINTS[1]],
            [BOTTOM_TAB_BAR_HEIGHT, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
      elevation: interpolate(
        translateY.value,
        [SNAP_POINTS[2] - 1, SNAP_POINTS[2]],
        [0, 10],
        Extrapolate.CLAMP,
      ),
    };
  }, [translateY.value]);

  const jumpTo = useCallback(
    ({ name }: { name: string }) => {
      //@ts-ignore
      navigation.jumpTo(name);
    },
    [navigation],
  );

  const isFocused = useCallback(
    (index: number) => {
      return state.index === index;
    },
    [state.index],
  );

  const borderStyle = useAnimatedStyle(() => {
    return {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: interpolate(
        translateY.value,
        [SNAP_POINTS[1], SNAP_POINTS[1] + COMPACT_HEIGHT],
        [width, 0],
        Extrapolate.CLAMP,
      ),
    };
  }, []);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false || regionId === STATES.EMPTY) {
    return null;
  }

  return (
    <>
      <Player ref={playerRef} />
      <Animated.View style={[styles.container, style]}>
        <View style={[styles.borderContainer]}>
          <Animated.View style={[styles.border, borderStyle]} />
        </View>
        {TABS.map((tab, index) => (
          <BorderlessButton
            style={styles.tab}
            onPress={() => jumpTo(tab)}
            key={tab.name}>
            {isFocused(index) ? <tab.ActiveIcon /> : <tab.InactiveIcon />}
            <Text
              style={[
                styles.title,
                {
                  color: isFocused(index) ? palette.app : palette.secondary,
                },
              ]}>
              {tab.title}
            </Text>
          </BorderlessButton>
        ))}
      </Animated.View>
    </>
  );
};

export default memo(TabBar);
