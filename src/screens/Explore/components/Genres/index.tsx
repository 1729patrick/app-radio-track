import { useNavigation } from '@react-navigation/native';

import React, { memo, useCallback } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';

import { GENRES } from './data';

import getStyles from './styles';

const Genres = () => {
  const { palette } = useTheme();
  const { navigate } = useNavigation();
  const styles = useStyles(getStyles);

  const onShowGenre = useCallback(
    ({ title, id }: { title: string; id: (string | never[])[] }) => {
      const url = `genres/${JSON.stringify(id)}`;
      navigate('Playlist', { title, url });
    },
    [navigate],
  );

  return (
    <View style={styles.genres}>
      <Text style={styles.title}>Estilos músicais</Text>

      {GENRES.map((genre) => (
        <ImageBackground
          source={genre.image}
          style={styles.card}
          key={genre.title}>
          <LinearGradient
            start={{ x: -0.5, y: 1 }}
            end={{ x: 1, y: 0 }}
            locations={[0.2, 1]}
            colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.1)']}
            style={styles.image}
          />

          <RectButton
            rippleColor={palette.background}
            style={styles.button}
            onPress={() => onShowGenre(genre)}>
            <Text style={styles.genreTitle} numberOfLines={1}>
              {genre.title}
            </Text>
          </RectButton>
        </ImageBackground>
      ))}
    </View>
  );
};

export default memo(Genres);
