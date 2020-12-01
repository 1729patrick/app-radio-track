import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

import Animated from 'react-native-reanimated';

import Header from '~/components/Header';

import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import StyleGuide from '~/utils/StyleGuide';
import FastImage from 'react-native-fast-image';

import { GENRES } from './data';

const Explore: React.FC = () => {
  const { translateY, scrollHandler } = useAnimatedHeader();
  const { navigate } = useNavigation();

  const onShowGenre = ({
    title,
    id,
  }: {
    title: string;
    id: (string | never[])[];
  }) => {
    const url = `genres/${JSON.stringify(id)}`;
    navigate('Playlist', { title, url });
  };

  return (
    <View style={styles.container}>
      <Header translateY={translateY} showBack={false} />
      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
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
              <Text style={styles.title} numberOfLines={1}>
                {genre.title}
              </Text>

              <FastImage
                style={styles.image}
                source={require('~/assets/vinyl.png')}
              />
            </RectButton>
          </LinearGradient>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Explore;

// https://uigradients.com/#DeepPurple
