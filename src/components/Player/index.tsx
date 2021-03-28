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

import BackgroundTimer from 'react-native-background-timer';

import { BackHandler, Platform, View } from 'react-native';
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
import getStyles from './styles';
import CompactPlayer from './components/CompactPlayer';

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
import { useAd } from '~/ads/contexts/AdContext';
import useStyles from '~/hooks/useStyles';

TrackPlayerEvents.REMOTE_NEXT = 'remote-next';

const events = [
  TrackPlayerEvents.PLAYBACK_ERROR,
  TrackPlayerEvents.REMOTE_NEXT,
  TrackPlayerEvents.REMOTE_PREVIOUS,
  TrackPlayerEvents.REMOTE_DUCK,
  TrackPlayerEvents.REMOTE_PLAY,
  TrackPlayerEvents.REMOTE_PAUSE,
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
  const { showPlayerAd } = useAd();
  const styles = useStyles(getStyles);

  const contentTranslateY = useSharedValue(CONTENT_SNAP_POINTS[1]);
  const [playing, setPlaying] = useState(false);
  const playbackState = usePlaybackState();
  const contentsRef = useRef<ContentsHandler>(null);
  const duckTimeoutRef = useRef(0);

  const playingRef = useRef(playing);

  const payingOnDisconnectMoment = useRef(false);
  const { addHistory } = useHistory();
  const { removePlayingRadio, setMetaData } = usePlaying();
  const isReconnected = useIsReconnected();
  const { isConnected } = useNetInfo();

  type PlayerAnimationState = 'compact' | 'expanded' | 'closed' | 'active';
  const [state, setState] = useState<PlayerState>({
    title: '',
    radios: [],
  });
  const [radioIndex, setRadioIndex] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const playerStateRef = useRef<PlayerAnimationState>('closed');
  const playerStatePreviousRef = useRef<PlayerAnimationState>('closed');

  const albumsRef = useRef<AlbumsHandler>(null);

  const radioIndexRef = useRef<number>(0);
  const radiosRef = useRef<RadioType[]>([]);
  const titleRef = useRef<string>('');
  const albumsMountedRef = useRef<boolean>(false);
  const isCorrectRadioRef = useRef<boolean>(false);
  const [errorRadioId, setErrorRadioId] = useState('');
  const seekRef = useRef<{ id?: string; date?: number }>({});

  const setPlayerState = useCallback((state: PlayerAnimationState) => {
    if (state === playerStateRef.current) {
      return;
    }

    playerStatePreviousRef.current = playerStateRef.current;
    playerStateRef.current = state;
  }, []);

  const onClose = useCallback(() => {
    if (
      playerStateRef.current === 'closed' &&
      playerStatePreviousRef.current !== 'closed'
    ) {
      resetTrackPlayer();

      setErrorRadioId('');
      setRadioIndex(0);
      setState({
        title: '',
        radios: [],
      });

      removePlayingRadio();
    }
  }, [setErrorRadioId, removePlayingRadio]);

  //@ts-ignore
  //todo: MUST BE REFECTORY
  useDerivedValue(() => {
    if (translateY.value === SNAP_POINTS[0]) {
      runOnJS(setPlayerState)('expanded');
    } else if (translateY.value === SNAP_POINTS[1]) {
      runOnJS(setPlayerState)('compact');
    } else if (translateY.value === SNAP_POINTS[2]) {
      runOnJS(setPlayerState)('closed');
      runOnJS(onClose)();
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
      alwaysPauseOnInterruption: false,
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

  const buffering = useMemo(() => {
    return playbackState === TrackPlayer.STATE_BUFFERING;
  }, [playbackState]);

  const playTrackPlayer = useCallback(async () => {
    try {
      setPlaying(true);

      const currentId = radiosRef.current[radioIndexRef.current]?.id;

      if (seekRef.current?.id === currentId) {
        const secondsSincePause =
          (Date.now() - (seekRef.current.date || Date.now())) / 1000;
        await TrackPlayer.seekTo(secondsSincePause);
        seekRef.current = {};
      }

      await TrackPlayer.play();

      setErrorRadioId('');
      addHistory(radiosRef.current[radioIndexRef.current]);
    } catch (e) {
      console.log(e.message, 'playTrackPlayer');
    }
  }, [addHistory, setErrorRadioId]);

  const resetTrackPlayer = async () => {
    setPlaying(false);
    await TrackPlayer.reset();
  };

  const pauseTrackPlayer = useCallback(async () => {
    setPlaying(false);

    seekRef.current = {
      id: radiosRef.current[radioIndexRef.current].id,
      date: Date.now(),
    };

    await TrackPlayer.pause();
  }, []);

  const addRadiosToTrackPlayer = useCallback(
    async (
      radios: RadioType[],
      radioIndex: number,
      autoPlay?: boolean,
      error?: boolean,
    ) => {
      try {
        const radio = radios[radioIndex];

        const previousRadio = radiosRef.current[radioIndexRef.current];
        if (
          previousRadio?.id === radio.id &&
          !error &&
          playerStateRef.current !== 'closed'
        ) {
          return;
        }
        const types = ['hls', 'dash', 'smoothstreaming'];

        const [{ type, url }] = radio.streams || [{}];
        const currentTrack = {
          url,
          id: radio.id,
          title: radio.name,
          artist: radio.slogan || radio.city?.name || '',
          artwork: image(radio.img),
          type: (types.find((typeTrack) => typeTrack === type)
            ? type
            : undefined) as
            | 'hls'
            | 'default'
            | 'dash'
            | 'smoothstreaming'
            | undefined,
        };

        await TrackPlayer.reset();
        await TrackPlayer.add(currentTrack);
        await TrackPlayer.skip(currentTrack.id);
        if (autoPlay) {
          playTrackPlayer();
        }

        if (radios.length === 1) {
          return;
        }

        const playlists = radios.reduce(
          (acc: { before: any; after: any }, radio, index) => {
            const [{ type, url }] = radio.streams || [{}];

            const track = {
              url,
              id: radio.id,
              title: radio.name,
              artist: radio.slogan || radio.city?.name,
              artwork: image(radio.img),
              type: types.find((typeTrack) => typeTrack === type)
                ? type
                : undefined,
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
      } catch (e) {
        console.log(e.message, 'addRadiosToTrackPlayer');
      }
    },
    [addHistory, playTrackPlayer],
  );

  const onSkipPlayer = useCallback(async () => {
    await TrackPlayer.skip(radiosRef.current[radioIndexRef.current].id);
    playTrackPlayer();

    addHistory(radiosRef.current[radioIndexRef.current]);

    showPlayerAd();
  }, [addHistory, playTrackPlayer, showPlayerAd]);

  const onTogglePlayback = useCallback(async () => {
    if (playbackState === TrackPlayer.STATE_STOPPED || errorRadioId) {
      addRadiosToTrackPlayer(state.radios, radioIndex, true, true);
    } else if (
      playbackState !== TrackPlayer.STATE_PLAYING &&
      playbackState !== TrackPlayer.STATE_BUFFERING
    ) {
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
      const size = args?.size || 'expand';
      const autoPlay = size !== 'compact';

      if (args) {
        const { radioIndex, radios, title } = args;

        if (Platform.OS === 'android') {
          addRadiosToTrackPlayer(radios, radioIndex, autoPlay);
        }

        albumsMountedRef.current = false;
        isCorrectRadioRef.current = false;
        radioIndexRef.current = radioIndex;
        radiosRef.current = radios;
        titleRef.current = title;
        seekRef.current = {};

        setErrorRadioId('');

        setRadioIndex(radioIndex);
        setState({ radios, title });

        setLoading(true);

        setMetaData({ radios, title, radioIndex });
      }

      if (size === 'expand') {
        animateToPoint(SNAP_POINTS[0]);
      } else {
        animateToPoint(SNAP_POINTS[1]);
      }
    },
    [addRadiosToTrackPlayer, animateToPoint, setErrorRadioId, setMetaData],
  );

  const onSetRadio = useCallback(
    (
      args: PlayerState & {
        radioIndex: number;
      },
    ) => {
      const { radioIndex, radios, title } = args;
      setErrorRadioId('');

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
    [addRadiosToTrackPlayer, setErrorRadioId, setMetaData],
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

    if (radioIndex === radioIndexRef.current) {
      setLoading(false);
    }
  }, [radioIndex]);

  const onRemoteDuck = useCallback(
    ({ permanent, paused }: { permanent: boolean; paused: boolean }) => {
      if (!permanent && !paused && payingOnDisconnectMoment.current) {
        duckTimeoutRef.current = BackgroundTimer.setTimeout(() => {
          payingOnDisconnectMoment.current = false;
          playTrackPlayer();
        }, 1729);
        return;
      }

      BackgroundTimer.clearTimeout(duckTimeoutRef.current);

      if (!payingOnDisconnectMoment.current) {
        payingOnDisconnectMoment.current = playingRef.current;
      }
      pauseTrackPlayer();
    },
    [pauseTrackPlayer, playTrackPlayer],
  );

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

        // if (!errorRadioId) {
        //   addRadiosToTrackPlayer(
        //     radiosRef.current,
        //     radioIndexRef.current,
        //     false,
        //     true,
        //   );
        // }

        setErrorRadioId(radiosRef.current[radioIndexRef.current].id);
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

      if (type === TrackPlayerEvents.REMOTE_PAUSE) {
        pauseTrackPlayer();
      }
    },
  );

  useImperativeHandle(ref, () => ({
    onExpandPlayer,
    onCompactPlayer,
  }));

  useEffect(() => {
    const handler = () => {
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
    };
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => BackHandler.removeEventListener('hardwareBackPress', handler);
  }, [contentTranslateY, onCompactPlayer, translateY.value]);

  useEffect(() => {
    if (isReconnected && payingOnDisconnectMoment.current) {
      addRadiosToTrackPlayer(
        radiosRef.current,
        radioIndexRef.current,
        true,
        true,
      );

      payingOnDisconnectMoment.current = false;
    }
  }, [addRadiosToTrackPlayer, isReconnected]);

  useEffect(() => {
    if (!isConnected && !payingOnDisconnectMoment.current) {
      payingOnDisconnectMoment.current = playingRef.current;
    }
  }, [isConnected]);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    setup();
  }, [setup]);

  const radio = useMemo(() => {
    return state.radios[radioIndex];
  }, [radioIndex, state.radios]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View style={[style]}>
          <View style={styles.player}>
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

            <Albums
              ref={albumsRef}
              y={translateY}
              contentY={contentTranslateY}
              radios={state.radios || []}
              setRadioIndex={onSetRadioIndex}
              radioIndex={radioIndexRef.current}
              loading={loading}
              onAlbumsMounted={onAlbumsMounted}
            />

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
              radioIndex={radioIndex}
              radiosLength={state?.radios?.length}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default memo(forwardRef(Player));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStateName(state: number) {
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
