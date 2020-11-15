import React from 'react';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import { HEADER_HEIGHT } from './constants';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';
import { Text } from 'react-native';
import Search from '../Search';

type HeaderProps = {
  translateY: Animated.SharedValue<number>;
};

const Header: React.FC<HeaderProps> = ({ translateY }) => {
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

  const styleContent = useAnimatedStyle(() => {
    return { opacity: interpolate(y.value, [-HEADER_HEIGHT, 0], [0, 1]) };
  });

  return (
    <>
      <Animated.View style={[styles.container, styleContainer]}>
        <Animated.View style={[styles.content, styleContent]}>
          <Text style={styles.title}>Radio Track</Text>
          <Icon
            name="md-search-outline"
            color={StyleGuide.palette.primary}
            size={22}
          />
        </Animated.View>
      </Animated.View>
      <Search />
    </>
  );
};

export default Header;
