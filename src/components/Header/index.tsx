import React, { useState } from 'react';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import { HEADER_HEIGHT } from './constants';

import styles from './styles';
import { Text } from 'react-native';
import Search from '~/screens/Search';
import RoundButton from '../Button/Round';

type HeaderProps = {
  translateY: Animated.SharedValue<number>;
};

const Header: React.FC<HeaderProps> = ({ translateY }) => {
  const [searchVisible, setSearchVisible] = useState(false);

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

  const onOpenSearch = () => {
    setSearchVisible(true);
  };

  const onCloseSearch = () => {
    setSearchVisible(false);
  };

  return (
    <>
      <Animated.View style={[styles.container, styleContainer]}>
        <Animated.View style={[styles.content, styleContent]}>
          <Text style={styles.title}>Radio Track</Text>
          <RoundButton
            size={22}
            name="md-search-outline"
            onPress={onOpenSearch}
            Icon={Icon}
          />
        </Animated.View>
      </Animated.View>
      {searchVisible && <Search onCloseSearch={onCloseSearch} />}
    </>
  );
};

export default Header;
