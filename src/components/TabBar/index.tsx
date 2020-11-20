import React from 'react';
import { Text } from 'react-native';
import { usePlayer } from '~/contexts/PlayerContext';
import Player from '../Player';

import StyleGuide from '~/utils/StyleGuide';
import styles from './styles';
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
import { SNAP_POINTS } from '../Player/constants';
import { HEIGHT } from './constants';

import { ActiveCompass, InactiveCompass } from './Icons/Compass';
import { ActiveHome, InactiveHome } from './Icons/Home';

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
];

type TabBarProps = BottomTabBarProps<BottomTabBarOptions>;

const TabBar: React.FC<TabBarProps> = ({ state, navigation }) => {
  const { playerRef, translateY } = usePlayer();

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            translateY.value,
            [SNAP_POINTS[0], SNAP_POINTS[1]],
            [HEIGHT, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [translateY.value]);

  const jumpTo = ({ name }: { name: string }) => {
    //@ts-ignore
    navigation.jumpTo(name);
  };

  const isFocused = (index: number) => {
    return state.index === index;
  };

  return (
    <>
      <Player ref={playerRef} />
      <Animated.View style={[styles.container, style]}>
        {TABS.map((tab, index) => (
          <BorderlessButton
            style={styles.tab}
            onPress={() => jumpTo(tab)}
            key={tab.name}>
            {isFocused(index) ? <tab.ActiveIcon /> : <tab.InactiveIcon />}
            <Text
              style={[
                styles.title,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  color: isFocused(index)
                    ? StyleGuide.palette.primary
                    : '#6d6e7c',
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

export default TabBar;
