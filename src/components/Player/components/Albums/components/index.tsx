import React, { memo } from 'react';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { SNAP_POINTS } from '~/components/Player/constants';

import { image } from '~/services/api';
import { RadioType } from '~/types/Station';
import StyleGuide from '~/utils/StyleGuide';

import { SNAP_POINTS as CONTENT_SNAP_POINTS } from '../../Contents/constants';

import styles from './styles';

type AlbumsProps = {
  item?: RadioType;
  contentY: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
};

const Album: React.FC<AlbumsProps> = ({ item, contentY, y }) => {
  return (
    <Animated.View style={[styles.card]}>
      <Animated.Image
        style={[styles.image]}
        source={{
          uri: image(item?.img),
        }}
      />
    </Animated.View>
  );
};

export default memo(Album);
