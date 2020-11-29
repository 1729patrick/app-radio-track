import React, { memo } from 'react';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import { HEADER_HEIGHT } from './constants';

import styles from './styles';
import { Text, View } from 'react-native';
import RoundButton from '../Button/Round';
import { useNavigation } from '@react-navigation/native';
import StyleGuide from '~/utils/StyleGuide';
import { StackNavigationProp } from '@react-navigation/stack';

import Logo from '~/components/Logo';
type HeaderProps = {
  translateY: Animated.SharedValue<number>;
  title?: string;
  backgroundColor?: string;
  showBack?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  translateY,
  title,
  backgroundColor = StyleGuide.palette.background,
  showBack = true,
}) => {
  const { navigate, pop } = useNavigation<StackNavigationProp<any>>();

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
      marginTop: y.value,
    };
  }, [y.value]);

  const styleContent = useAnimatedStyle(() => {
    return { opacity: interpolate(y.value, [-HEADER_HEIGHT, 0], [0, 1]) };
  });

  const onOpenSearch = () => {
    navigate('Search');
  };

  const onBackPress = () => {
    pop();
  };

  return (
    <Animated.View
      style={[styles.container, styleContainer, { backgroundColor }]}>
      <Animated.View style={[styles.content, styleContent]}>
        <View style={styles.left}>
          {showBack && (
            <RoundButton
              onPress={onBackPress}
              name={'arrow-back'}
              size={24}
              Icon={Icon}
              style={styles.backButton}
            />
          )}

          <Text style={styles.title}>{title || 'Rádio Sintonia'}</Text>
        </View>

        <RoundButton
          size={22}
          name="md-search-outline"
          onPress={onOpenSearch}
          Icon={Icon}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Header);
