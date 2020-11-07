import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useState,
  useRef,
} from 'react';
import { BackHandler, Dimensions, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolate,
  useDerivedValue,
} from 'react-native-reanimated';

import Albums, { AlbumsHandler } from './components/Albums';
import Artist from './components/Artist';
import BottomControls from './components/Controls/Bottom';
import TopControls from './components/Controls/Top';

const { height } = Dimensions.get('window');

import { SNAP_POINTS, TIMING_DURATION } from './constants';
import styles from './styles';
import CompactPlayer from './components/CompactPlayer';

import { Radios } from '../Radios';

export type PlayerState = {
  title?: string;
  radios?: Radios;
};

export type PlayerHandler = {
  onExpandPlayer: (args?: PlayerState & { radioIndex: number }) => void;
  onCompactPlayer: () => void;
};

type PlayerProps = {};

const Player: React.ForwardRefRenderFunction<PlayerHandler, PlayerProps> = (
  {},
  ref,
) => {
  const opacity = useSharedValue(2);
  const translateY = useSharedValue(SNAP_POINTS[2]);
  const [state, setState] = useState<PlayerState>({});
  const [radioIndex, setRadioIndex] = useState<number>(0);
  const albumsRef = useRef<AlbumsHandler>(null);

  const y = useDerivedValue(() => {
    return interpolate(
      translateY.value,
      SNAP_POINTS,
      SNAP_POINTS,
      Extrapolate.CLAMP,
    );
  }, [translateY.value]);

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (evt, ctx) => {
      translateY.value = evt.translationY + ctx.startY;
    },
    onEnd: (evt, ctx) => {
      const value = ctx.startY;
      const velocity = evt.velocityY;

      if (
        velocity < 1000 &&
        ((ctx.startY === SNAP_POINTS[1] && translateY.value < height * 0.5) ||
          ctx.startY === SNAP_POINTS[0])
      ) {
        if (translateY.value < height * 0.3) {
          translateY.value = withTiming(SNAP_POINTS[0], {
            duration: TIMING_DURATION,
          });
        } else {
          translateY.value = withTiming(SNAP_POINTS[1], {
            duration: TIMING_DURATION,
          });
        }

        return;
      }

      const point = value + 0.2 * velocity;

      const diffPoint = (p: number) => Math.abs(point - p);

      const deltas = SNAP_POINTS.map((p) => diffPoint(p));

      const getMinDelta = () => {
        if (value === SNAP_POINTS[0]) {
          return Math.min(deltas[0], deltas[1]);
        }

        return Math.min(deltas[0], deltas[1], deltas[2]);
      };

      const minDelta = getMinDelta();

      const val = SNAP_POINTS.reduce(
        (acc, p) => (diffPoint(p) === minDelta ? p : acc),
        0,
      );

      translateY.value = withTiming(val, { duration: TIMING_DURATION });
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
      opacity: opacity.value,
    };
  });

  const playbackState = usePlaybackState();

  useEffect(() => {
    TrackPlayer.addEventListener('remote-duck', async () => {
      await TrackPlayer.pause();
    });
  }, [playbackState]);

  useEffect(() => {
    setup();
  }, []);

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });
  }

  async function togglePlayback() {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();

      if (currentTrack === null || playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.reset();

        await TrackPlayer.add({
          id: 'local-track',
          url: 'http://audio07.viaflux.com:5511/live',
          title: 'Pure (Demo)',
          artist: 'David Chavez',
          artwork:
            'https://pbs.twimg.com/profile_images/1196855902172798979/t_xvyE-D_400x400.jpg',
        });

        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onExpandPlayer = useCallback(
    (args?: PlayerState & { radioIndex: number }) => {
      translateY.value = withTiming(SNAP_POINTS[0], {
        duration: TIMING_DURATION,
      });

      if (args) {
        const { radioIndex, ...restArgs } = args;
        setState(restArgs);
        setRadioIndex(radioIndex);
        console.log(albumsRef.current?.scrollToAlbum);
        albumsRef.current?.scrollToAlbum({ radioIndex, animated: false });
      }
    },
    [translateY],
  );

  const onCompactPlayer = useCallback(() => {
    if (SNAP_POINTS[0] === translateY.value) {
      translateY.value = withTiming(SNAP_POINTS[1], {
        duration: TIMING_DURATION,
      });
    }
  }, [translateY]);

  useImperativeHandle(ref, () => ({
    onExpandPlayer,
    onCompactPlayer,
  }));

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const open = translateY.value === SNAP_POINTS[0];
      if (open) {
        onCompactPlayer();
      }

      return open;
    });
  }, [onCompactPlayer, translateY.value]);

  const onNextRadio = () => {
    if (radioIndex < state?.radios?.length - 1) {
      const nextIndex = radioIndex + 1;

      albumsRef.current?.scrollToAlbum({
        radioIndex: nextIndex,
        animated: true,
      });
    }
  };

  const onPreviousRadio = () => {
    if (radioIndex - 1 >= 0) {
      const previousIndex = radioIndex - 1;

      albumsRef.current?.scrollToAlbum({
        radioIndex: previousIndex,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={[styles.player, style]}>
          <CompactPlayer
            y={y}
            onExpandPlayer={onExpandPlayer}
            radioIndex={radioIndex}
            radios={state?.radios}
          />
          <TopControls
            y={y}
            onCompactPlayer={onCompactPlayer}
            title={state?.title}
          />

          <Albums
            ref={albumsRef}
            y={y}
            radios={state?.radios}
            setRadioIndex={setRadioIndex}
          />

          <View
          // onLayout={({ nativeEvent }) =>
          //   console.log(nativeEvent.layout.height)
          // }
          >
            <Artist y={y} radioIndex={radioIndex} radios={state?.radios} />
            <BottomControls
              y={y}
              onNextRadio={onNextRadio}
              onPreviousRadio={onPreviousRadio}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return 'None';
    case TrackPlayer.STATE_PLAYING:
      return 'Playing';
    case TrackPlayer.STATE_PAUSED:
      return 'Paused';
    case TrackPlayer.STATE_STOPPED:
      return 'Stopped';
    case TrackPlayer.STATE_BUFFERING:
      return 'Buffering';
  }
}

async function skipToNext() {
  try {
    await TrackPlayer.skipToNext();
  } catch (_) {}
}

async function skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch (_) {}
}

export default forwardRef(Player);
