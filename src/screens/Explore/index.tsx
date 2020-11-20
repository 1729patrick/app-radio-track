import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import Radios, { Radios as RadiosTpe } from '~/components/Radios';

import Animated from 'react-native-reanimated';

import Header from '~/components/Header';
import { colors } from '~/utils/Colors';

import radios from '~/services/radios.js';
import { usePlayer } from '~/contexts/PlayerContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import { useNavigation } from '@react-navigation/native';

const GENRES = [
  { title: 'Sports', colors: ['#F2994A', '#F2C94C'] },
  { title: 'MBP', colors: ['#29323c', '#485563'] },
  { title: 'News', colors: ['#2B32B2', '#1488CC'] },
  { title: 'Dance', colors: ['#08c792', '#2afeb7'] },
  { title: 'Oldies', colors: ['#94716B', '#B79891'] },
  { title: 'Jazz', colors: ['#4e4376', '#2b5876'] },
  { title: 'Electronic', colors: ['#512DA8', '#673AB7'] },
  { title: 'Classic', colors: ['#0F2027', '#2C5364'] },
  { title: 'Romantic', colors: ['#61045F', '#AA076B'] },
  { title: 'Country', colors: ['#EB3349', '#F45C43'] },
  { title: 'Pop', colors: ['#8E54E9', '#4776E6'] },
  { title: 'Bossa Nova', colors: ['#363795', '#005C97'] },
  { title: 'Reggae', colors: ['#232526', '#414345'] },
  { title: 'Catholic', colors: ['#414d0b', '#727a17'] },
  { title: 'Gospel', colors: ['#7a2828', '#a73737'] },
  { title: 'Hip Hop', colors: ['#3f4c6b', '#606c88'] },
  // { title: 'Top 40',  },
];

const Explore: React.FC = () => {
  const { translateY, scrollHandler } = useAnimatedHeader();
  const { navigate } = useNavigation();

  const { onOpenPlayer } = usePlayer();

  const stations = useMemo<RadiosTpe>(() => {
    return radios.map((radio) => {
      return { ...radio, color: colors[0] };
    });
  }, []);

  const onShowAll = (title: string) => {
    navigate('Playlist', { title });
  };

  return (
    <View style={styles.container}>
      <Header translateY={translateY} showBack={false} />
      <View style={styles.content}>
        <Animated.ScrollView
          contentContainerStyle={styles.contentContainer}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <View style={{ width: '100%' }}>
            <Text style={{ backgroundColor: 'blue' }}>xxx</Text>
          </View>

          {GENRES.map((genre) => (
            <LinearGradient
              key={genre.title}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              locations={[0.2, 1]}
              colors={genre.colors}
              style={styles.card}>
              <Text style={styles.title}>{genre.title}</Text>
            </LinearGradient>
          ))}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default Explore;
