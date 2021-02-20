import { MaterialTopTabDescriptorMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { TabNavigationState } from '@react-navigation/native';
import React, { memo } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';

type TabProps = {
  descriptors: MaterialTopTabDescriptorMap;
  route: any;
  state: TabNavigationState<Record<string, object | undefined>>;
  inputRange: number[];
  index: number;
  position: any;
  onPress: (key: string, name: string, isFocused: boolean) => void;
  onLongPress: (key: string) => void;
  onLayout: (props: LayoutChangeEvent, index: number) => void;
};

const Tab = ({
  descriptors,
  route,
  state,
  inputRange,
  index,
  position,
  onPress,
  onLongPress,
  onLayout,
}: TabProps) => {
  const { options } = descriptors[route.key];
  const isFocused = state.index === index;

  const color = Animated.interpolateColors(position, {
    inputRange,
    outputColorRange: inputRange.map((i) =>
      i === index ? StyleGuide.palette.app : StyleGuide.palette.secondary,
    ),
  });

  return (
    <View onLayout={(props) => onLayout(props, index)}>
      <TouchableOpacity
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={() => onPress(route.key, route.name, isFocused)}
        onLongPress={() => onLongPress(route.key)}
        style={styles.tab}>
        <Animated.Text style={[styles.title, { color }]}>
          {options.title}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Tab);
