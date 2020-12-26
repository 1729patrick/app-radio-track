import React, { useCallback, useRef, useState } from 'react';
import Animated, { Extrapolate } from 'react-native-reanimated';
import { LayoutChangeEvent } from 'react-native';

import styles from './styles';
import StyleGuide from '~/utils/StyleGuide';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import Tab from './components/Tab';

type TabBarProps = {
  translateY: Animated.SharedValue<number>;
};

const TabBar: React.FC<TabBarProps & MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  const inputRange = state.routes.map((_, i: number) => i);
  const tabPositionRef = useRef<{ x: number; width: number }[]>([]);
  const [tabsPosition, setTabsPosition] = useState([
    { x: 0, width: 0 },
    { x: 0, width: 0 },
  ]);

  const width = Animated.interpolateNode(position, {
    inputRange: tabsPosition.map((_, i) => i),
    outputRange: tabsPosition.map(({ width }) => width),
  });

  const translateX = Animated.interpolateNode(position, {
    inputRange: tabsPosition.map((_, i) => i),
    outputRange: tabsPosition.map(({ x }) => x),
    extrapolate: Extrapolate.CLAMP,
  });

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent, index: number) => {
      const { width, x } = nativeEvent.layout;

      const widthFormatted = width - StyleGuide.spacing * 2;
      const xFormatted = x + StyleGuide.spacing;

      tabPositionRef.current[index] = {
        width: widthFormatted,
        x: xFormatted,
      };

      if (tabPositionRef.current.length === state.routes.length) {
        setTabsPosition(tabPositionRef.current);
      }
    },
    [state.routes.length],
  );

  const onLongPress = useCallback(
    (target) => {
      navigation.emit({
        target,
        type: 'tabLongPress',
      });
    },
    [navigation],
  );

  const onPress = useCallback(
    (target, name, isFocused) => {
      const event = navigation.emit({
        target,
        type: 'tabPress',
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(name);
      }
    },
    [navigation],
  );

  return (
    <Animated.View style={[styles.container]}>
      <Animated.View
        style={[styles.indicator, { width, transform: [{ translateX }] }]}
      />

      {state.routes.map((route, index) => (
        <Tab
          key={route.name}
          descriptors={descriptors}
          route={route}
          state={state}
          inputRange={inputRange}
          index={index}
          position={position}
          onPress={onPress}
          onLongPress={onLongPress}
          onLayout={onLayout}
        />
      ))}
    </Animated.View>
  );
};

export default TabBar;
