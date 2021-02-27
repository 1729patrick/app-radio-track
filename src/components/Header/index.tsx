import React, { memo, useCallback, useRef } from 'react';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { HEADER_HEIGHT } from './constants';

import getStyles from './styles';
import { Image, Text, View } from 'react-native';
import RoundButton from '../Button/Round';
import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import useStyles from '~/hooks/useStyles';
import { useTheme } from '~/contexts/ThemeContext';
import Modal from '../Modal';
import {
  BorderlessButton,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { useCountry } from '~/contexts/CountryContext';
import { flag } from '~/services/api';

type HeaderProps = {
  translateY: Animated.SharedValue<number>;
  title?: string;
  backgroundColor?: string;
  showBack?: boolean;
  showSearch?: boolean;
  elevation?: number;
};

const Header: React.FC<HeaderProps> = ({
  translateY,
  title,
  backgroundColor,
  showBack = true,
  showSearch = true,
  elevation = 0,
}) => {
  const { navigate, pop } = useNavigation<StackNavigationProp<any>>();
  const styles = useStyles(getStyles);
  const { palette } = useTheme();
  const { show } = useCountry();

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
        { backgroundColor: backgroundColor || palette.background, elevation },
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

        <View style={styles.rightButtons}>
          {showSearch && (
            <RoundButton
              size={22}
              name="md-search-outline"
              onPress={onOpenSearch}
              Icon={IonIcon}
            />
          )}

          <BorderlessButton
            rippleColor={palette.secondary}
            hitSlop={{ top: 58, bottom: 58, left: 58, right: 58 }}
            onPress={show}
            style={styles.flagButton}>
            <Image source={{ uri: flag('br') }} style={styles.flag} />
          </BorderlessButton>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Header);
