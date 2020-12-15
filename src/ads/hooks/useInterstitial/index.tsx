import { useCallback, useEffect, useMemo, useRef } from 'react';

import TrackPlayer, {
  //@ts-ignore
  usePlaybackState,
} from 'react-native-track-player';

import {
  TestIds,
  InterstitialAd,
  AdEventType,
} from '@react-native-firebase/admob';

import { BLOCKS } from '../../constants';

const useInterstitial = (id: string) => {
  const loadedRef = useRef<boolean | undefined>();
  const showOnLoadRef = useRef<boolean | undefined>();

  const playbackStateOnShowMoment = useRef();
  const playbackState = usePlaybackState();

  const interstitial = useMemo(() => {
    const unitId = __DEV__ ? TestIds.INTERSTITIAL : id;

    return InterstitialAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['music', 'radio', 'player', 'live music'],
    });
  }, [id]);

  const showAd = useCallback(() => {
    if (loadedRef.current) {
      playbackStateOnShowMoment.current = playbackState;
      interstitial.show();
    } else if (loadedRef.current === undefined) {
      showOnLoadRef.current = true;
    }

    loadedRef.current = false;
  }, [playbackState, interstitial]);

  const loadAd = useCallback(() => {
    interstitial.load();
  }, [interstitial]);

  const continuePlaying = useCallback(async () => {
    await TrackPlayer.seekTo(24 * 60 * 60);
    await TrackPlayer.play();
  }, []);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        loadedRef.current = true;

        if (showOnLoadRef.current) {
          showAd();
          showOnLoadRef.current = false;
        }
      } else if (type === 'closed') {
        const isPlayer = interstitial.adUnitId === BLOCKS.PLAYER;

        const wasPlaying =
          playbackStateOnShowMoment.current === TrackPlayer.STATE_PLAYING;

        if (
          (wasPlaying || isPlayer) &&
          playbackState !== TrackPlayer.STATE_PLAYING
        ) {
          continuePlaying();
        }
      }
    });

    interstitial.load();

    return () => {
      eventListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interstitial]);

  return { showAd, loadAd };
};

export default useInterstitial;
