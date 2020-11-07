import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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

import Albums from './components/Albums';
import Artist from './components/Artist';
import ArtistTop from './components/Artist/components/Top';
import Controls from './components/Controls';

const { width, height } = Dimensions.get('window');
const points = [0, height - 70];
export default function PlaylistScreen() {
  const scrollRef = useRef();

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const y = useDerivedValue(() => {
    return interpolate(translateY.value, points, points, Extrapolate.CLAMP);
  });

  const panHandler = useAnimatedGestureHandler({
    onStart: (evt, ctx) => {
      ctx.startY = translateY.value;
      // scale.value = withSpring(0.5);
      // opacity.value = withTiming(0.5);
    },
    onActive: (evt, ctx) => {
      translateY.value = evt.translationY + ctx.startY;
    },
    onEnd: (evt, ctx) => {
      const value = ctx.startY;
      const velocity = evt.velocityY;

      if (
        velocity < 1000 &&
        ((ctx.startY === points[1] && translateY.value < height * 0.5) ||
          ctx.startY === points[0])
      ) {
        if (translateY.value < height * 0.3) {
          translateY.value = withTiming(points[0]);
        } else {
          translateY.value = withTiming(points[1]);
        }

        return;
      }

      const point = value + 0.5 * velocity;
      const diffPoint = (p: number) => Math.abs(point - p);
      const deltas = points.map((p) => diffPoint(p));

      const minDelta = Math.min(deltas[0], deltas[1]);

      const val = points.reduce(
        (acc, p) => (diffPoint(p) === minDelta ? p : acc),
        0,
      );

      translateY.value = withTiming(val);
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

  const onPressPlayer = () => {
    if (height - 70 === translateY.value) {
      translateY.value = withTiming(0);
    }
  };

  return (
    <View style={{ flexGrow: 1, backgroundColor: 'blue' }}>
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View
          style={[styles.container, style]}
          onTouchEndCapture={onPressPlayer}>
          <ArtistTop y={y} />
          <Albums y={y} points={points} />

          <View
          // onLayout={({ nativeEvent }) =>
          //   console.log(nativeEvent.layout.height)
          // }
          >
            <Artist y={y} />
            <Controls y={y} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width,
    height,
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {
    marginTop: 40,
  },
  state: {
    marginTop: 20,
  },
});
