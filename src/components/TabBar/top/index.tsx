import React, { useRef, useState } from 'react';
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
const TabBar: React.FC<TabBarProps & MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
  translateY,
}) => {
  const inputRange = state.routes.map((_, i: number) => i);
  const tabPositionRef = useRef<{ x: number; width: number }[]>([]);
  const [tabsPosition, setTabsPosition] = useState([
    { x: 0, width: 0 },
    { x: 0, width: 0 },
  ]);

  const y = useDerivedValue(() => {
    const validY = interpolate(
      translateY.value,
      [-HEADER_HEIGHT, 0],
      [-HEADER_HEIGHT, 0],
      Extrapolate.CLAMP,
    );

    return validY;
  }, [translateY.value]);

  const styleContainer = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  }, [y.value]);

  const width = Animated.interpolateNode(position, {
    inputRange: tabsPosition.map((_, i) => i),
    outputRange: tabsPosition.map(({ width }) => width),
  });

  const translateX = Animated.interpolateNode(position, {
    inputRange: tabsPosition.map((_, i) => i),
    outputRange: tabsPosition.map(({ x }) => x),
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View style={[styles.container, styleContainer]}>
      <Animated.View
        style={[styles.indicator, { width, transform: [{ translateX }] }]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
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
        };

        const color = Animated.interpolateColors(position, {
          inputRange,
          outputColorRange: inputRange.map((i: number) =>
            i === index
              ? StyleGuide.palette.primary
              : StyleGuide.palette.secondary,
          ),
        });

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            onLayout={onLayout}>
            <Animated.Text style={[styles.title, { color }]}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

export default TabBar;
