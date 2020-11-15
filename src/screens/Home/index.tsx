import React, { useRef, useMemo } from 'react';
import { Text, View } from 'react-native';
import Player, { PlayerHandler, PlayerState } from '~/components/Player';

import styles from './styles';
import Radios, { Radios as RadiosTpe } from '~/components/Radios';

import Icon from 'react-native-vector-icons/Ionicons';
import StyleGuide from '~/utils/StyleGuide';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import { HEADER_SIZE, HEADER_HEIGHT } from './constants';

const Home = () => {
  const translateY = useSharedValue(0);

  const y = useDerivedValue(() => {
    const validY = interpolate(
      translateY.value,
      [-HEADER_HEIGHT, 0],
      [-HEADER_HEIGHT, 0],
      Extrapolate.CLAMP,
    );

    return validY;
  }, [translateY.value]);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onBeginDrag: (event, context) => {
        context.upTranslateY = context.upTranslateY || 0;
        context.upOffsetY = context.upOffsetY || 0;
      },
      onScroll: (event, context) => {
        if (context.startY <= event.contentOffset.y) {
          const y =
            event.contentOffset.y -
            context.downOffsetY -
            context.downTranslateY;

          context.upTranslateY = Math.min(y, HEADER_HEIGHT);

          context.upOffsetY = event.contentOffset.y;

          translateY.value = -context.upTranslateY;
        } else {
          const y =
            context.upOffsetY - event.contentOffset.y - context.upTranslateY;

          context.downTranslateY = Math.min(y, 0);

          context.downOffsetY = event.contentOffset.y;

          translateY.value = context.downTranslateY;
        }

        context.startY = event.contentOffset.y;
      },
    },
    [],
  );

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  });

  const stylezz = useAnimatedStyle(() => {
    return { opacity: interpolate(y.value, [-HEADER_SIZE, 0], [0, 1]) };
  });

  // const stations = useMemo<RadiosTpe>(() => {
  //   return radios.map((radio) => {
  //     return { ...radio, color: colors[0] };
  //   });
  // }, []);
  const stations = useMemo<RadiosTpe>(() => {
    return [];
  }, []);

  const playerRef = useRef<PlayerHandler>(null);

  const onOpenRadio = (args: PlayerState) => {
    playerRef.current?.onExpandPlayer(args);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, stylez]}>
        <Animated.View style={[styles.contentHeader, stylezz]}>
          <Text style={styles.title}>Radio Track</Text>
          <Icon
            name="md-search-outline"
            color={StyleGuide.palette.primary}
            size={22}
          />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <Radios
          title="Ouvidas recentemente"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Suas rádios favoritas"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Descubra uma nova rádio"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios populares"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios recomendadas"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios da sua região"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios da sua região"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios da sua região"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios da sua região"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
        <Radios
          title="Rádios da sua região"
          radios={stations.sort(() => 0.5 - Math.random())}
          onOpenRadio={onOpenRadio}
        />
      </Animated.ScrollView>
      <Player ref={playerRef} />
    </View>
  );
};

export default Home;
