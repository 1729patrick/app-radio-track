import React, { useRef, useMemo } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Player, { PlayerHandler, PlayerState } from '~/components/Player';

import styles from './styles';
import Radios, { Radios as RadiosTpe } from '~/components/Radios';

import radios from '~/services/radios';
import { colors } from '~/utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import StyleGuide from '~/utils/StyleGuide';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Home = () => {
  const translateY = useSharedValue(0);
  const relativeUpY = useSharedValue(0);
  const relativeDownY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onBeginDrag: (event, context) => {
        context.startY = event.contentOffset.y;
      },
      onScroll: (event, context) => {
        if (context.startY <= event.contentOffset.y) {
          translateY.value = relativeDownY.value - event.contentOffset.y;
          relativeUpY.value = event.contentOffset.y;
        } else {
          translateY.value = relativeUpY.value - event.contentOffset.y - 70;
          relativeDownY.value = event.contentOffset.y;
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
          translateY: interpolate(
            translateY.value,
            [-70, 0],
            [-70, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const stations = useMemo<RadiosTpe>(() => {
    return radios.map((radio) => {
      return { ...radio, color: colors[0] };
    });
  }, []);

  const playerRef = useRef<PlayerHandler>(null);

  const onOpenRadio = (args: PlayerState) => {
    playerRef.current?.onExpandPlayer(args);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, stylez]}>
        <Text style={styles.title}>Radio Track</Text>
        <Icon
          name="md-search-outline"
          color={StyleGuide.palette.primary}
          size={25}
        />
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
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
      </Animated.ScrollView>
      <Player ref={playerRef} />
    </View>
  );
};

export default Home;
