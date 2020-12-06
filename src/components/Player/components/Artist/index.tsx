import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
// import RoundButton from '~/components/Button/Round';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioType } from '~/types/Station';
import { SNAP_POINTS } from '../../constants';
import styles from './styles';
import TextTicker from 'react-native-text-ticker';
import { SNAP_POINTS as CONTENT_SNAP_POINTS } from '../Contents/constants';

type ArtistType = {
  y: Animated.SharedValue<number>;
  contentY: Animated.SharedValue<number>;
  radio: RadioType;
};

const Artist: React.FC<ArtistType> = ({ y, contentY, radio = {} }) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [SNAP_POINTS[0], SNAP_POINTS[1] * 0.2],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  }, [y.value]);

  const styleContent = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        contentY.value,
        [CONTENT_SNAP_POINTS[1], CONTENT_SNAP_POINTS[1] * 0.75],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  }, [contentY.value]);

  // const onVoteDownPress = () => {};
  // const onVoteUpPress = () => {};

  return (
    <View>
      <Animated.View style={[styles.container, styleContent, style]}>
        <View style={styles.info}>
          {/* <RoundButton
            Icon={Icon}
            name="thumbs-o-down"
            size={27}
            onPress={onVoteDownPress}
          /> */}
          <TextTicker
            bounce={false}
            loop
            scrollSpeed={450}
            easing={Easing.linear}
            style={[styles.title]}>
            {radio.name}
          </TextTicker>
          {/* <RoundButton
            Icon={Icon}
            name="thumbs-o-up"
            size={27}
            onPress={onVoteUpPress}
          /> */}

          <TextTicker
            bounce={false}
            loop
            scrollSpeed={450}
            easing={Easing.linear}
            style={[styles.description]}>
            {radio.slogan || radio.city?.name}
          </TextTicker>
        </View>
      </Animated.View>
    </View>
  );
};

export default Artist;
