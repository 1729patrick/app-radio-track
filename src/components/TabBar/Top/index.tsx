import React, { memo, useCallback, useRef, useState } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { LayoutChangeEvent, TouchableOpacity } from 'react-native';

import styles from './styles';
import { HEADER_HEIGHT } from '~/components/Header/constants';
import StyleGuide from '~/utils/StyleGuide';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

type TabBarProps = {
  translateY: Animated.SharedValue<number>;
};

const Tab = memo(
  ({
    descriptors,
    route,
    state,
    inputRange,
    index,
    position,
    onPress,
    onLongPress,
    onLayout,
  }) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    const opacity = Animated.interpolateNode(position, {
      inputRange,
      outputRange: inputRange.map((i) => (i === index ? 1 : 0.65)),
    });

    return (
      <TouchableOpacity
        activeOpacity={1}
        key={route.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={() => onPress(route.key, route.name, isFocused)}
        onLongPress={() => onLongPress(route.key)}
        style={styles.tab}
        onLayout={(props) => onLayout(props, index)}>
        <Animated.Text style={[styles.title, { opacity }]}>
          {options.title}
        </Animated.Text>
      </TouchableOpacity>
    );
  },
);

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
