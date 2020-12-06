import React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import styles from './styles';
import Tab from './Tab';

const { width } = Dimensions.get('window');

const Header = ({ onPress, pages, translateX, animation }) => {
  const indicatorWidth = width / pages.length;
  const inputRange = pages.map((_, i: number) => i);

  const x = useDerivedValue(() => {
    return (translateX.value * width) / pages.length;
  }, [translateX.value]);

  const styleIndicator = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
      opacity: animation.value,
    };
  }, [x.value]);

  return (
    <View style={styles.container}>
      {pages.map(({ title }, index) => (
        <Tab
          key={title}
          title={title}
          index={index}
          onPress={onPress}
          translateX={translateX}
          indicatorWidth={indicatorWidth}
          inputRange={inputRange}
          animation={animation}
        />
      ))}

      <Animated.View
        style={[styles.tabIndicator, { width: indicatorWidth }, styleIndicator]}
      />
    </View>
  );
};

export default Header;
