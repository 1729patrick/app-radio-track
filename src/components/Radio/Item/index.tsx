import React, { memo, useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import getStyles from './styles';

import { RectButton } from 'react-native-gesture-handler';
import RoundButton from '~/components/Button/Round';
import LottieView from 'lottie-react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { RadioType } from '~/types/Station';
import { image } from '~/services/api';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';

type RadioProps = {
  playing: boolean;
  item: RadioType;
  index: number;
  onExpandPlayer: (args: { radioIndex: number }) => void;
};

const Radio: React.FC<RadioProps> = ({
  playing,
  item,
  index,
  onExpandPlayer,
}) => {
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  const onRadioPress = useCallback(() => {
    onExpandPlayer({ radioIndex: index });
  }, [index, onExpandPlayer]);

  return (
    <RectButton
      style={[styles.container]}
      rippleColor={palette.secondary}
      onPress={onRadioPress}>
      <Image
        style={styles.image}
        source={{
          uri: image(item.img),
        }}
      />

      <View style={styles.info}>
        <Text style={[styles.title]} numberOfLines={1}>
          {item.name}
        </Text>

        {(!!item.slogan || !!item.city?.name) && (
          <Text style={[styles.description]} numberOfLines={1}>
            {item.slogan || item.city?.name}
          </Text>
        )}
      </View>

      {playing ? (
        <LottieView
          source={require('~/assets/playing.json')}
          autoPlay
          loop
          style={styles.playing}
          speed={1}
          colorFilters={[
            {
              keypath: 'Path 6',
              color: palette.app,
            },
            {
              keypath: 'Path 7',
              color: palette.app,
            },
            {
              keypath: 'Path 8',
              color: palette.app,
            },
          ]}
        />
      ) : (
        <RoundButton
          Icon={Icon}
          name="ios-play-circle-outline"
          size={27}
          color={palette.app}
          onPress={onRadioPress}
        />
      )}
    </RectButton>
  );
};

export default memo(Radio);
