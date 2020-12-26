import React, { memo, useCallback } from 'react';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { HEADER_HEIGHT } from './constants';

import styles from './styles';
import { Text, View } from 'react-native';
import RoundButton from '../Button/Round';
import { useNavigation } from '@react-navigation/native';
import StyleGuide from '~/utils/StyleGuide';
import { StackNavigationProp } from '@react-navigation/stack';

type HeaderProps = {
  translateY: Animated.SharedValue<number>;
  title?: string;
  backgroundColor?: string;
  showBack?: boolean;
  elevation?: number;
};

const Header: React.FC<HeaderProps> = ({
  translateY,
  title,
  backgroundColor = StyleGuide.palette.background,
  showBack = true,
  elevation = 0,
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

  const onOpenSearch = useCallback(() => {
    navigate('Search');
  }, [navigate]);

  const onBackPress = useCallback(() => {
    pop();
  }, [pop]);

  return (
    <Animated.View
      style={[
        styles.container,
        styleContainer,
        { backgroundColor, elevation },
      ]}>
      <Animated.View style={[styles.content, styleContent]}>
        <View style={styles.left}>
          {showBack && (
            <RoundButton
              onPress={onBackPress}
              name={'arrowleft'}
              size={24}
              Icon={Icon}
              style={styles.backButton}
            />
          )}

          <Text style={styles.title}>{title || 'Rádio Online'}</Text>
        </View>

        <RoundButton
          size={22}
          name="md-search-outline"
          onPress={onOpenSearch}
          Icon={IonIcon}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Header);
