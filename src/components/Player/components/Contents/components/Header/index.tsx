import React, { memo } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { RouteType } from '../..';

import styles from './styles';
import Tab from './Tab';

const { width } = Dimensions.get('window');

type HeaderProps = {
  onPress: (index: number) => void;
  routes: RouteType[];
  translateX: Animated.SharedValue<number>;
  animation: Animated.SharedValue<number>;
};

const Header: React.FC<HeaderProps> = ({
  onPress,
  routes,
  translateX,
  animation,
}) => {
  const indicatorWidth = width / routes.length;
  const inputRange = routes.map((_, i: number) => i);

  const x = useDerivedValue(() => {
    return (translateX.value * width) / routes.length;
  }, [translateX.value]);

  const styleIndicator = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
      opacity: animation.value,
    };
  }, [x.value]);

  return (
    <View style={styles.container}>
      {routes.map(({ title }, index) => (
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

export default memo(Header);
