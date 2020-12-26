import { MaterialTopTabDescriptorMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { TabNavigationState } from '@react-navigation/native';
import React, { memo } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

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

  const opacity = Animated.interpolateNode(position, {
    inputRange,
    outputRange: inputRange.map((i) => (i === index ? 1 : 0.65)),
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
        <Animated.Text style={[styles.title, { opacity }]}>
          {options.title}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Tab);
