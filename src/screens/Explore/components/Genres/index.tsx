import { useNavigation } from '@react-navigation/native';
import isEqual from 'lodash.isequal';
import React, { memo, useCallback } from 'react';
import { Image, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import StyleGuide from '~/utils/StyleGuide';
import { GENRES } from './data';

import styles from './styles';
const Genres = () => {
  const { navigate } = useNavigation();

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
        <LinearGradient
          key={genre.title}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          locations={[0.2, 1]}
          colors={genre.colors}
          style={styles.card}>
          <RectButton
            rippleColor={StyleGuide.palette.background}
            style={styles.button}
            onPress={() => onShowGenre(genre)}>
            <Text style={styles.genreTitle} numberOfLines={1}>
              {genre.title}
            </Text>

            <Image
              style={styles.image}
              source={require('~/assets/vinyl.png')}
            />
          </RectButton>
        </LinearGradient>
      ))}
    </View>
  );
};

export default memo(Genres, isEqual);
