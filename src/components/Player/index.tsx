import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useState,
  useRef,
  useMemo,
  memo,
} from 'react';
import isEqual from 'lodash.isequal';
import BackgroundTimer from 'react-native-background-timer';

import { BackHandler, LayoutChangeEvent, Platform, View } from 'react-native';
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
  withTiming,
  useDerivedValue,
  runOnJS,
  useSharedValue,
} from 'react-native-reanimated';

import Albums, { AlbumsHandler } from './components/Albums';
import Artist from './components/Artist';
import BottomControls from './components/Controls/Bottom';
import TopControls from './components/Controls/Top';

import { SNAP_POINTS, TIMING_DURATION } from './constants';
import styles from './styles';
import CompactPlayer from './components/CompactPlayer';

import usePrevious from '~/hooks/usePrevious';

import AnimatedBackground, {
  AnimatedBackgroundHandler,
} from '~/components/AnimatedBackground';
import { usePlayer } from '~/contexts/PlayerContext';
import { RadioType } from '~/types/Station';
import { useHistory } from '~/contexts/HistoryContext';
import { usePlaying } from '~/contexts/PlayingContext';
import { image } from '~/services/api';
import useIsReconnected from '~/hooks/useIsReconnected';
import { useNetInfo } from '@react-native-community/netinfo';
import Contents, { ContentsHandler } from './components/Contents';
import { useInteractivePanGestureHandler } from '~/hooks/useInteractivePanGestureHandler';
import { SNAP_POINTS as CONTENT_SNAP_POINTS } from './components/Contents/constants';

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
  radios: RadioType[];
};

export type onExpandPlayer = (
  args: PlayerState & { radioIndex: number; size?: 'expand' | 'compact' },
) => void;

export type PlayerHandler = {
  onExpandPlayer: onExpandPlayer;
  onCompactPlayer: (radio: any) => void;
};

type PlayerProps = {};

const Player: React.ForwardRefRenderFunction<PlayerHandler, PlayerProps> = (
  {},
  ref,
) => {
  const { translateY } = usePlayer();
  const artistAndControlHeight = useSharedValue(300);

  const contentTranslateY = useSharedValue(CONTENT_SNAP_POINTS[1]);
  const [playing, setPlaying] = useState(false);
  const playbackState = usePlaybackState();
  const playbackStateRef = useRef(playbackState);
  const checkPlayingTimeout = useRef(0);
  const contentsRef = useRef<ContentsHandler>();

  const playbackStatePreviousRef = useRef(playbackState);
  const runWhenArtistAndControlMount = useRef<() => void | undefined>();

  const playbackStateOnDisconnectMoment = useRef<number>(-1);
  const { addHistory } = useHistory();
  const { removePlayingRadio, setMetaData } = usePlaying();
  const isReconnected = useIsReconnected();
  const { isConnected } = useNetInfo();

  const [state, setState] = useState<PlayerState>({
    title: '',
    radios: [],
  });
  const [radioIndex, setRadioIndex] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [playerState, setPlayerState] = useState<
    'compact' | 'expanded' | 'closed' | 'active'
  >('closed');
  const playerStatePrevious = usePrevious(playerState);

  const albumsRef = useRef<AlbumsHandler>(null);
  const animatedBackgroundRef = useRef<AnimatedBackgroundHandler>(null);

  const waitForInteractionPlaybackState = useRef(true);
  const radioIndexRef = useRef<number>(0);
  const radiosRef = useRef<RadioType[]>([]);
  const titleRef = useRef<string>('');
  const albumsMountedRef = useRef<boolean>(false);
  const isCorrectRadioRef = useRef<boolean>(false);
  const [errorRadioId, setErrorRadioId] = useState('');

  //@ts-ignore
  //todo: MUST BE REFECTORY
  useDerivedValue(() => {
    if (translateY.value === SNAP_POINTS[0]) {
      runOnJS(setPlayerState)('expanded');
    } else if (translateY.value === SNAP_POINTS[1]) {
      runOnJS(setPlayerState)('compact');
    } else if (translateY.value === SNAP_POINTS[2]) {
      runOnJS(setPlayerState)('closed');
    } else {
      runOnJS(setPlayerState)('active');
    }
  }, [translateY.value]);

  const animateToPoint = useCallback(
    (point: number) => {
      'worklet';

      translateY.value = withTiming(point, {
        duration: TIMING_DURATION,
      });
    },
    [translateY],
  );

  const { panHandler } = useInteractivePanGestureHandler(
    translateY,
    SNAP_POINTS,
    animateToPoint,
  );

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  }, [translateY.value]);

  const setup = useCallback(async () => {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      //@ts-ignore
      alwaysPauseOnInterruption: true,
      icon: require('../../assets/notification/logo.png'),
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

  useEffect(() => {
    if (
      waitForInteractionPlaybackState.current ||
      playbackStatePreviousRef.current === playbackState
    ) {
      return;
    }

    if (
      (playbackState === TrackPlayer.STATE_PAUSED ||
        playbackState === TrackPlayer.STATE_STOPPED) &&
      playbackStatePreviousRef.current === TrackPlayer.STATE_PLAYING
    ) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }

    playbackStatePreviousRef.current = playbackState;
  }, [playbackState]);

  const buffering = useMemo(() => {
    return playbackState === TrackPlayer.STATE_BUFFERING;
  }, [playbackState]);

  const playTrackPlayer = useCallback(async () => {
    await TrackPlayer.seekTo(24 * 60 * 60);
    await TrackPlayer.play();

    setErrorRadioId('');
    addHistory(radiosRef.current[radioIndexRef.current]);
  }, [addHistory]);

  const resetTrackPlayer = async () => {
    await TrackPlayer.reset();
  };

  const onSkipPlayer = useCallback(async () => {
    await TrackPlayer.skip(radiosRef.current[radioIndexRef.current].id);
    playTrackPlayer();

    addHistory(radiosRef.current[radioIndexRef.current]);
  }, [addHistory, playTrackPlayer]);

  const pauseTrackPlayer = useCallback(async () => {
    await TrackPlayer.pause();
  }, []);

  const addRadiosToTrackPlayer = useCallback(
    async (
      radios: RadioType[],
      radioIndex: number,
      autoPlay?: boolean,
      error?: boolean,
    ) => {
      const radio = radios[radioIndex];

      const previousRadio = radiosRef.current[radioIndexRef.current];
      //todo

      if (
        previousRadio?.id === radio.id &&
        !error &&
        playerState !== 'closed'
      ) {
        return;
      }

      const currentTrack = {
        id: radio.id,
        url: radio.streams[0]?.url,
        title: radio.name,
        artist: radio.slogan || radio.city?.name || '',
        artwork: image(radio.img),
        type: (radio.streams[0]?.url?.endsWith('.m3u8') ? 'hls' : undefined) as
          | 'hls'
          | 'default'
          | 'dash'
          | 'smoothstreaming'
          | undefined,
      };

      await TrackPlayer.reset();

      await TrackPlayer.add(currentTrack);
      if (autoPlay) {
        playTrackPlayer();
      }

      if (radios.length === 1) {
        return;
      }

      const playlists = radios.reduce(
        (acc: { before: any; after: any }, radio, index) => {
          const track = {
            id: radio.id,
            url: radio.streams[0]?.url,
            title: radio.name,
            artist: radio.slogan || radio.city?.name,
            artwork: image(radio.img),
            type: radio.streams[0]?.url?.endsWith('.m3u8') ? 'hls' : undefined,
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

      addHistory(radiosRef.current[radioIndexRef.current]);
    },
    [addHistory, playTrackPlayer, playerState],
  );

  const onTogglePlayback = useCallback(async () => {
    waitForInteractionPlaybackState.current = false;

    if (playbackState === TrackPlayer.STATE_STOPPED || errorRadioId) {
      addRadiosToTrackPlayer(state.radios, radioIndex, true, true);
    } else if (playbackState !== TrackPlayer.STATE_PLAYING) {
      playTrackPlayer();
    } else {
      pauseTrackPlayer();
    }
  }, [
    addRadiosToTrackPlayer,
    errorRadioId,
    pauseTrackPlayer,
    playTrackPlayer,
    playbackState,
    radioIndex,
    state.radios,
  ]);

  const onExpandPlayer = useCallback(
    (
      args?: PlayerState & {
        radioIndex: number;
        size?: 'expand' | 'compact';
      },
    ) => {
      runWhenArtistAndControlMount.current = undefined;

      const size = args?.size || 'expand';
      const autoPlay = size !== 'compact';

      if (args) {
        const { radioIndex, radios, title } = args;
        setErrorRadioId('');

        animatedBackgroundRef.current?.setup({
          radioIndex,
          radiosSize: radios.length,
        });

        if (Platform.OS === 'android') {
          addRadiosToTrackPlayer(radios, radioIndex, autoPlay);
        }

        albumsMountedRef.current = false;
        isCorrectRadioRef.current = false;
        radioIndexRef.current = radioIndex;
        radiosRef.current = radios;
        titleRef.current = title;

        setRadioIndex(radioIndex);
        setState({ radios, title });

        setLoading(true);

        setMetaData({ radios, title, radioIndex });
      }

      if (size === 'expand') {
        animateToPoint(SNAP_POINTS[0]);
        waitForInteractionPlaybackState.current = false;
      } else {
        if (artistAndControlHeight.value !== 300) {
          animateToPoint(SNAP_POINTS[1]);
        } else {
          runWhenArtistAndControlMount.current = () =>
            animateToPoint(SNAP_POINTS[1]);
        }
      }
    },
    [
      addRadiosToTrackPlayer,
      animateToPoint,
      artistAndControlHeight.value,
      setMetaData,
    ],
  );

  const onSetRadio = useCallback(
    (
      args: PlayerState & {
        radioIndex: number;
      },
    ) => {
      const { radioIndex, radios, title } = args;
      setErrorRadioId('');

      animatedBackgroundRef.current?.setup({
        radioIndex,
        radiosSize: radios.length,
      });

      if (Platform.OS === 'android') {
        addRadiosToTrackPlayer(radios, radioIndex, true);
      }

      albumsMountedRef.current = false;
      isCorrectRadioRef.current = false;
      radioIndexRef.current = radioIndex;
      radiosRef.current = radios;
      titleRef.current = title;

      setRadioIndex(radioIndex);
      setState({ radios, title });

      setLoading(true);

      setMetaData({ radios, title, radioIndex });
    },
    [addRadiosToTrackPlayer, setMetaData],
  );

  const onCompactPlayer = useCallback(async () => {
    if (SNAP_POINTS[0] === translateY.value) {
      animateToPoint(SNAP_POINTS[1]);
    }
  }, [animateToPoint, translateY.value]);

  const onNextRadio = useCallback(() => {
    if (radioIndexRef.current < radiosRef.current.length - 1) {
      radioIndexRef.current = radioIndexRef.current + 1;

      onSkipPlayer();

      albumsRef.current?.scrollToAlbum({
        radioIndex: radioIndexRef.current,
        animated: true,
      });
    }
  }, [onSkipPlayer]);

  const onPreviousRadio = useCallback(() => {
    if (radioIndexRef.current - 1 >= 0) {
      radioIndexRef.current = radioIndexRef.current - 1;

      onSkipPlayer();

      albumsRef.current?.scrollToAlbum({
        radioIndex: radioIndexRef.current,
        animated: true,
      });
    }
  }, [onSkipPlayer]);

  const onSetRadioIndex = useCallback(
    (radioIndex: number) => {
      if (!albumsMountedRef.current) {
        return;
      } else if (!isCorrectRadioRef.current) {
        isCorrectRadioRef.current = radioIndex === radioIndexRef.current;

        if (isCorrectRadioRef.current) {
          setLoading(false);
        }

        return;
      }

      const changedPlaying = radioIndexRef.current !== radioIndex;
      setRadioIndex(radioIndex);
      radioIndexRef.current = radioIndex;

      if (changedPlaying) {
        onSkipPlayer();
      }
    },
    [onSkipPlayer],
  );

  const onAlbumsMounted = useCallback(() => {
    albumsMountedRef.current = true;
  }, []);

  const onRemoteDuck = useCallback(
    ({ permanent, paused }: { permanent: boolean; paused: boolean }) => {
      if (
        !permanent &&
        !paused &&
        (playbackStateOnDisconnectMoment.current ===
          TrackPlayer.STATE_PLAYING ||
          playbackStateOnDisconnectMoment.current ===
            TrackPlayer.STATE_BUFFERING ||
          playbackStateOnDisconnectMoment.current === TrackPlayer.STATE_NONE)
      ) {
        playTrackPlayer();
        return;
      }

      if (playbackStateOnDisconnectMoment.current < 0) {
        playbackStateOnDisconnectMoment.current = playbackState;
      }
      pauseTrackPlayer();
    },
    [pauseTrackPlayer, playTrackPlayer, playbackState],
  );

  useEffect(() => {
    if (playbackState === TrackPlayer.STATE_PLAYING) {
      BackgroundTimer.clearTimeout(checkPlayingTimeout.current);
      checkPlayingTimeout.current = BackgroundTimer.setTimeout(() => {
        if (playbackStateRef.current === TrackPlayer.STATE_PLAYING) {
          playbackStateOnDisconnectMoment.current = -1;
        }
      }, 3000);
    }
  }, [playbackState]);

  useEffect(() => {
    playbackStateRef.current = playbackState;
  }, [playbackState]);

  useTrackPlayerEvents(
    events,
    ({
      type,
      ...args
    }: {
      type: string;
      permanent: boolean;
      paused: boolean;
    }) => {
      if (type === TrackPlayerEvents.PLAYBACK_ERROR) {
        // console.warn(
        //   'An error occurred while playing the current track.',
        //   args,
        // );

        setErrorRadioId(radiosRef.current[radioIndexRef.current].id);

        addRadiosToTrackPlayer(
          radiosRef.current,
          radioIndexRef.current,
          false,
          true,
        );
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
    },
  );

  useImperativeHandle(ref, () => ({
    onExpandPlayer,
    onCompactPlayer,
  }));

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const contentsOpen = contentTranslateY.value === CONTENT_SNAP_POINTS[0];
      if (contentsOpen) {
        contentsRef.current?.onCompactContent();
        return true;
      }

      const playerOpen = translateY.value === SNAP_POINTS[0];
      if (playerOpen) {
        onCompactPlayer();

        return true;
      }

      return false;
    });
  }, [contentTranslateY, onCompactPlayer, translateY.value]);

  useEffect(() => {
    if (playerState === 'closed' && playerStatePrevious !== 'closed') {
      resetTrackPlayer();

      setErrorRadioId('');
      setRadioIndex(0);
      setState({
        title: '',
        radios: [],
      });

      removePlayingRadio();
    }
  }, [playerState, playerStatePrevious, removePlayingRadio]);

  useEffect(() => {
    if (
      isReconnected &&
      playbackStateOnDisconnectMoment.current === TrackPlayer.STATE_PLAYING
    ) {
      addRadiosToTrackPlayer(
        radiosRef.current,
        radioIndexRef.current,
        true,
        true,
      );
    }
  }, [addRadiosToTrackPlayer, isReconnected]);

  useEffect(() => {
    if (!isConnected && playbackStateOnDisconnectMoment.current < 0) {
      playbackStateOnDisconnectMoment.current = playbackState;
    }
  }, [isConnected, playbackState]);

  useEffect(() => {
    setup();
  }, [setup]);

  const radio = useMemo(() => {
    return state.radios[radioIndex];
  }, [radioIndex, state.radios]);

  const onLayoutArtistAndControl = ({ nativeEvent }: LayoutChangeEvent) => {
    if (artistAndControlHeight.value !== 300) {
      return;
    }

    artistAndControlHeight.value = nativeEvent.layout.height;

    if (typeof runWhenArtistAndControlMount.current === 'function') {
      runWhenArtistAndControlMount.current();
    }
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={style}>
          <AnimatedBackground style={styles.player} ref={animatedBackgroundRef}>
            <Contents
              translateY={contentTranslateY}
              playing={playing}
              buffering={buffering}
              onTogglePlayback={onTogglePlayback}
              radio={radio || {}}
              error={!!errorRadioId}
              ref={contentsRef}
              onSetRadio={onSetRadio}
            />

            <CompactPlayer
              playing={playing}
              buffering={buffering}
              onTogglePlayback={onTogglePlayback}
              radio={radio || {}}
              error={!!errorRadioId}
              y={translateY}
              onPress={onExpandPlayer}
            />

            <TopControls
              y={translateY}
              contentY={contentTranslateY}
              onCompactPlayer={onCompactPlayer}
              title={state.title}
              radio={radio}
            />

            {radio && (
              <Albums
                ref={albumsRef}
                y={translateY}
                contentY={contentTranslateY}
                radios={state.radios}
                setRadioIndex={onSetRadioIndex}
                radioIndex={radioIndexRef.current}
                loading={loading}
                onAlbumsMounted={onAlbumsMounted}
                scrollHandler={animatedBackgroundRef.current?.scrollHandler}
                errorRadioId={errorRadioId}
                artistAndControlHeight={artistAndControlHeight}
              />
            )}

            <View onLayout={onLayoutArtistAndControl}>
              <Artist
                y={translateY}
                contentY={contentTranslateY}
                radio={state.radios[radioIndex]}
              />

              <BottomControls
                y={translateY}
                contentY={contentTranslateY}
                onNextRadio={onNextRadio}
                onPreviousRadio={onPreviousRadio}
                onTogglePlayback={onTogglePlayback}
                playing={playing}
                buffering={buffering}
                error={!!errorRadioId}
              />
            </View>
          </AnimatedBackground>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default memo(forwardRef(Player), isEqual);

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
