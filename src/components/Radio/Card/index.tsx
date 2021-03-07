import React, { memo } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import getStyles from './styles';
import LottieView from 'lottie-react-native';

import { RadioType } from '~/types/Station';
import { image } from '~/services/api';
import useStyles from '~/hooks/useStyles';
import { useTheme } from '~/contexts/ThemeContext';

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

  return (
    <View style={[styles.card]}>
      <TouchableOpacity
        onPress={() => onExpandPlayer({ radioIndex: index })}
        hitSlop={{ top: 0, bottom: 50, left: 0, right: 0 }}
        style={styles.button}
        activeOpacity={0.4}>
        <Image
          style={styles.image}
          source={{
            uri: image(item.img),
          }}
        />
        {playing && (
          <View style={styles.playingContainer}>
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
          </View>
        )}
      </TouchableOpacity>

      <View>
        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.slogan || item.city?.name}
        </Text>
      </View>
    </View>
  );
};

export default memo(Radio);
