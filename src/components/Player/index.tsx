import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useState,
  useRef,
  useMemo,
} from 'react';
import { BackHandler, Dimensions, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import TrackPlayer, {
  //@ts-ignore
  usePlaybackState,
  //@ts-ignore
  useTrackPlayerEvents,
  //@ts-ignore
  TrackPlayerEvents,
} from 'react-native-track-player';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolate,
  useDerivedValue,
  //@ts-ignore
  runOnJS,
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
import usePrevious from '~/hooks/usePrevious';

import AnimatedBackground from '~/components/AnimatedBackground';

TrackPlayerEvents.REMOTE_NEXT = 'remote-next';

const events = [
  TrackPlayerEvents.PLAYBACK_ERROR,
  TrackPlayerEvents.REMOTE_NEXT,
  TrackPlayerEvents.REMOTE_PREVIOUS,
  TrackPlayerEvents.REMOTE_DUCK,
  TrackPlayerEvents.REMOTE_PLAY,
];

export type PlayerState = {
  title: string;
  radios: Radios;
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
  const playbackState = usePlaybackState();
  const playbackStatePrevious = usePrevious(playbackState);

  const translateY = useSharedValue(SNAP_POINTS[2]);

  const [state, setState] = useState<PlayerState>({
    title: '',
    radios: [],
  });
  const [radioIndex, setRadioIndex] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [playerState, setPlayerState] = useState<
    'compact' | 'expanded' | 'closed'
  >('closed');

  const albumsRef = useRef<AlbumsHandler>(null);
  const animatedBackgroundRef = useRef<any>(null);

  const radioIndexRef = useRef<number>(0);
  const radiosRef = useRef<Radios>([]);
  const albumsMountedRef = useRef<boolean>(false);
  const waitLoadCorrectRadioRef = useRef<boolean>(true);

  const y = useDerivedValue(() => {
    const validY = interpolate(
      translateY.value,
      SNAP_POINTS,
      SNAP_POINTS,
      Extrapolate.CLAMP,
    );

    if (validY === SNAP_POINTS[0]) {
      runOnJS(setPlayerState)('expanded');
    } else if (validY === SNAP_POINTS[1]) {
      runOnJS(setPlayerState)('compact');
    } else if (validY === SNAP_POINTS[2]) {
      runOnJS(setPlayerState)('closed');
    }

    return validY;
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

      const point = value + 0.8 * velocity;

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
    };
  });

  const setup = useCallback(async () => {
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
  }, []);

  const seeking = useMemo(() => {
    return (
      playbackStatePrevious === TrackPlayer.STATE_PAUSED &&
      playbackState === TrackPlayer.STATE_PLAYING
    );
  }, [playbackState, playbackStatePrevious]);

  const playing = useMemo(() => {
    return playbackState === TrackPlayer.STATE_PLAYING && !seeking;
  }, [playbackState, seeking]);

  const stopped = useMemo(() => {
    return playbackState !== TrackPlayer.STATE_PLAYING || seeking;
  }, [playbackState, seeking]);

  const buffering = useMemo(() => {
    return playbackState === TrackPlayer.STATE_BUFFERING;
  }, [playbackState]);

  const playTrackPlayer = async () => {
    await TrackPlayer.seekTo(24 * 60 * 60);
    TrackPlayer.play();
  };

  const stopTrackPlayer = () => {
    TrackPlayer.stop();
  };

  const nextTrackPlayer = () => {
    TrackPlayer.skipToNext();
  };

  const previousTrackPlayer = () => {
    TrackPlayer.skipToPrevious();
  };

  const pauseTrackPlayer = () => {
    TrackPlayer.pause();
  };

  const addRadiosToTrackPlayer = useCallback(
    async (radios: Radios, radioIndex: number) => {
      const radio = radios[radioIndex];

      const currentTrack = {
        id: radio.title_song,
        url: radio.radio_stream,
        title: radio.radio_name,
        artist: radio.title_song,
        artwork: radio.radio_logo,
      };

      const currentPlaying = await TrackPlayer.getCurrentTrack();
      if (currentPlaying === currentTrack.id) {
        return;
      }

      await TrackPlayer.reset();

      await TrackPlayer.add(currentTrack);
      await TrackPlayer.play();

      const playlists = radios.reduce(
        (acc: { before: any; after: any }, radio, index) => {
          const track = {
            id: radio.title_song,
            url: radio.radio_stream,
            title: radio.radio_name,
            artist: radio.title_song,
            artwork: radio.radio_logo,
          };

          return {
            before: index < radioIndex ? [...acc.before, track] : acc.before,
            after: index > radioIndex ? [...acc.after, track] : acc.after,
          };
        },
        { before: [], after: [] },
      );

      await TrackPlayer.add(playlists.before, currentTrack.id);
      await TrackPlayer.add(playlists.after);
    },
    [],
  );

  const onTogglePlayback = useCallback(async () => {
    if (playbackState === TrackPlayer.STATE_STOPPED) {
      addRadiosToTrackPlayer(state.radios, radioIndex);
    } else if (playbackState !== TrackPlayer.STATE_PLAYING) {
      playTrackPlayer();
    } else {
      pauseTrackPlayer();
    }
  }, [addRadiosToTrackPlayer, playbackState, radioIndex, state.radios]);

  const onExpandPlayer = useCallback(
    (args?: PlayerState & { radioIndex: number }) => {
      if (args) {
        const { radioIndex, ...restArgs } = args;

        waitLoadCorrectRadioRef.current = true;
        radioIndexRef.current = radioIndex;
        radiosRef.current = restArgs.radios;

        setRadioIndex(radioIndex);
        setState(restArgs);

        addRadiosToTrackPlayer(restArgs.radios, radioIndex);

        if (restArgs.title === state.title) {
          albumsRef.current?.scrollToAlbum({ radioIndex, animated: false });
        } else {
          setLoading(true);
          albumsMountedRef.current = false;
        }
      }

      translateY.value = withTiming(SNAP_POINTS[0], {
        duration: TIMING_DURATION,
      });
    },
    [addRadiosToTrackPlayer, state.title, translateY],
  );

  const onCompactPlayer = useCallback(() => {
    if (SNAP_POINTS[0] === translateY.value) {
      translateY.value = withTiming(SNAP_POINTS[1], {
        duration: TIMING_DURATION,
      });
    }
  }, [translateY]);

  const onNextRadio = useCallback(() => {
    if (radioIndexRef.current < radiosRef.current.length - 1) {
      radioIndexRef.current = radioIndexRef.current + 1;

      nextTrackPlayer();

      albumsRef.current?.scrollToAlbum({
        radioIndex: radioIndexRef.current,
        animated: true,
      });
    }
  }, []);

  const onPreviousRadio = useCallback(() => {
    if (radioIndexRef.current - 1 >= 0) {
      radioIndexRef.current = radioIndexRef.current - 1;

      previousTrackPlayer();

      albumsRef.current?.scrollToAlbum({
        radioIndex: radioIndexRef.current,
        animated: true,
      });
    }
  }, []);

  const onSetRadioIndex = useCallback((radioIndex: number) => {
    if (waitLoadCorrectRadioRef.current) {
      waitLoadCorrectRadioRef.current = radioIndexRef.current !== radioIndex;

      return;
    }

    if (radioIndex < radioIndexRef.current) {
      previousTrackPlayer();
    } else if (radioIndex > radioIndexRef.current) {
      nextTrackPlayer();
    }

    setRadioIndex(radioIndex);
    radioIndexRef.current = radioIndex;
  }, []);

  const onAlbumsMounted = useCallback(() => {
    albumsMountedRef.current = true;
  }, []);

  const onRemoteDuck = useCallback(
    ({ permanent, paused }: { permanent: boolean; paused: boolean }) => {
      if (!permanent && !paused) {
        playTrackPlayer();
        return;
      }

      pauseTrackPlayer();
    },
    [],
  );

  useTrackPlayerEvents(events, ({ type, ...args }: { type: string }) => {
    if (type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.warn('An error occurred while playing the current track.', args);
    }

    if (type === TrackPlayerEvents.REMOTE_NEXT) {
      onNextRadio();
    }
    if (type === TrackPlayerEvents.REMOTE_PREVIOUS) {
      onPreviousRadio();
    }

    if (type === TrackPlayerEvents.REMOTE_DUCK) {
      onRemoteDuck(args);
    }

    if (type === TrackPlayerEvents.REMOTE_PLAY) {
      playTrackPlayer();
    }
  });

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

  useEffect(() => {
    if (playerState === 'closed') {
      stopTrackPlayer();
    }
  }, [playerState]);

  useEffect(() => {
    if (radiosRef.current[radioIndex]?.color) {
      console.log('chamou', radioIndex);
      animatedBackgroundRef.current.setColor(
        radiosRef.current[radioIndex]?.color,
      );
    }
  }, [radioIndex]);

  useEffect(() => {
    setup();
  }, [setup]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={style}>
          <AnimatedBackground style={styles.player} ref={animatedBackgroundRef}>
            <CompactPlayer
              y={y}
              onExpandPlayer={onExpandPlayer}
              radioIndex={radioIndex}
              radios={state.radios}
              playing={playing}
              stopped={stopped}
              buffering={buffering}
              onTogglePlayback={onTogglePlayback}
            />
            <TopControls
              y={y}
              onCompactPlayer={onCompactPlayer}
              title={state.title}
            />

            <Albums
              ref={albumsRef}
              y={y}
              radios={state.radios}
              setRadioIndex={onSetRadioIndex}
              radioIndex={radioIndexRef.current}
              loading={loading}
              setLoading={setLoading}
              onAlbumsMounted={onAlbumsMounted}
            />

            <View
            // onLayout={({ nativeEvent }) =>
            //   console.log(nativeEvent.layout.height)
            // }
            >
              <Artist y={y} radioIndex={radioIndex} radios={state.radios} />
              <BottomControls
                y={y}
                onNextRadio={onNextRadio}
                onPreviousRadio={onPreviousRadio}
                onTogglePlayback={onTogglePlayback}
                playing={playing}
                stopped={stopped}
                buffering={buffering}
              />
            </View>
          </AnimatedBackground>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default forwardRef(Player);
