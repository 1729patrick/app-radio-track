import React, { useRef, useMemo } from 'react';
import { View } from 'react-native';
import Player, { PlayerHandler, PlayerState } from '~/components/Player';

import styles from './styles';
import Radios, { Radios as RadiosTpe } from '~/components/Radios';

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import Header from '~/components/Header';
import { HEADER_HEIGHT } from '~/components/Header/constants';
import { colors } from '~/utils/Colors';

import radios from '~/services/radios.js';
import { usePlayer } from '~/contexts/PlayerContext';

type ScrollHandlerContext = {
  upTranslateY: number;
  downTranslateY: number;
  upOffsetY: number;
  downOffsetY: number;
  startY: number;
};

const Home: React.FC = () => {
  const translateY = useSharedValue(0);
  const { onOpenPlayer } = usePlayer();

  const scrollHandler = useAnimatedScrollHandler<ScrollHandlerContext>(
    {
      onBeginDrag: (_, context) => {
        context.upTranslateY = context.upTranslateY || 0;
        context.upOffsetY = context.upOffsetY || 0;
      },
      onScroll: (event, context) => {
        if (context.startY < event.contentOffset.y) {
          const offsetY = Math.max(event.contentOffset.y, 0);
          const { downOffsetY, downTranslateY } = context;

          const y = offsetY - downOffsetY - downTranslateY;

          context.upTranslateY = Math.min(y, HEADER_HEIGHT);

          context.upOffsetY = offsetY;

          translateY.value = -context.upTranslateY;
        } else {
          const offsetY = Math.max(event.contentOffset.y, 0);
          const { upOffsetY, upTranslateY } = context;
          const y = upOffsetY - offsetY - upTranslateY;

          context.downTranslateY = Math.min(y, 0);

          context.downOffsetY = offsetY;

          translateY.value = context.downTranslateY;
        }

        context.startY = event.contentOffset.y;
      },
    },
    [],
  );

  const stations = useMemo<RadiosTpe>(() => {
    return radios.map((radio) => {
      return { ...radio, color: colors[0] };
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header translateY={translateY} />

      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Radios
          title="Ouvidas recentemente"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Suas rádios favoritas"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Descubra uma nova rádio"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios populares"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios recomendadas"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
        <Radios
          title="Rádios da sua região"
          radios={[...stations]}
          onOpenPlayer={onOpenPlayer}
        />
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
