import React, { memo } from 'react';
import { View } from 'react-native';

import styles from './styles';

import Animated from 'react-native-reanimated';

import Header from '~/components/Header';

import useAnimatedHeader from '~/hooks/useAnimatedHeader';


import Regions from './components/Regions';
import Genres from './components/Genres';

const Explore: React.FC = () => {
  const { translateY, scrollHandler } = useAnimatedHeader();

  return (
    <View style={styles.container}>
      <Header translateY={translateY} showBack={false} />
      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Regions />

        <Genres />
      </Animated.ScrollView>
    </View>
  );
};

export default memo(Explore);

// https://uigradients.com/#DeepPurple
