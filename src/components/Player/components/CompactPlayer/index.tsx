import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import { SNAP_POINTS } from '../../constants';
import {
  RectButton,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';

import { PlayerState } from '../../';
import { Radios } from '~/components/Radios';

type CompactPlayerType = {
  y: Animated.SharedValue<number>;
  radioIndex?: number;
  radios?: Radios;
  onExpandPlayer: (args?: PlayerState & { radioIndex: number }) => void;
};

const CompactPlayer: React.FC<CompactPlayerType> = ({
  y,
  onExpandPlayer,
  radioIndex,
  radios,
}) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [SNAP_POINTS[1] * 0.85, SNAP_POINTS[1]],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const title = useMemo(() => {
    if (!radios || radioIndex === undefined) {
      return '';
    }

    return radios[radioIndex]?.artist_song;
  }, [radios, radioIndex]);

  const description = useMemo(() => {
    if (!radios || radioIndex === undefined) {
      return '';
    }

    return radios[radioIndex]?.radio_name;
  }, [radios, radioIndex]);

  return (
    <Animated.View style={[styles.container, style]}>
      <RectButton style={styles.compactButton} onPress={() => onExpandPlayer()}>
        <View style={styles.info}>
          <Text style={[styles.title]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.description]}>{description}</Text>
        </View>

        <View style={styles.controls}>
          <RectButton
            style={styles.button}
            onPress={() => {
              console.log('click');
            }}>
            <Icon name="heart-outline" size={25} color="#900" />
          </RectButton>
          {/* <Icon name="heart-sharp" size={22} color="#900" /> */}

          <RectButton style={styles.button}>
            <Icon name="play" size={25} color="#900" />
            {/* <Icon name="stop" size={30} color="#900" /> */}
          </RectButton>
        </View>
      </RectButton>
    </Animated.View>
  );
};

export default CompactPlayer;
