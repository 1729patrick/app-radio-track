import { useEffect, useMemo, useRef } from 'react';

import TrackPlayer, {
  //@ts-ignore
  usePlaybackState,
} from 'react-native-track-player';

import {
  TestIds,
  RewardedAd,
  RewardedAdEventType,
} from '@react-native-firebase/admob';

import { BLOCKS } from '../../constants';

const useReward = (id: string) => {
  const loadedRef = useRef<boolean | undefined>();
  const showOnLoadRef = useRef<boolean | undefined>();

  const playbackStateOnShowMoment = useRef();
  const playbackState = usePlaybackState();

  const rewarded = useMemo(() => {
    const unitId = __DEV__ ? TestIds.REWARDED : id;

    return RewardedAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['music', 'radio', 'player'],
    });
  }, [id]);

  const showAd = () => {
    if (loadedRef.current) {
      playbackStateOnShowMoment.current = playbackState;
      rewarded.show();
    } else if (loadedRef.current === undefined) {
      showOnLoadRef.current = true;
    }

    loadedRef.current = false;
  };

  const loadAd = () => {
    rewarded.load();
  };

  const continuePlaying = async () => {
    await TrackPlayer.seekTo(24 * 60 * 60);
    await TrackPlayer.play();
  };

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type) => {
      if (type === RewardedAdEventType.LOADED) {
        loadedRef.current = true;

        if (showOnLoadRef.current) {
          showAd();
          showOnLoadRef.current = false;
        }
      } else if (type === 'closed') {
        const isPlayer = rewarded.adUnitId === BLOCKS.PLAYER;

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

    rewarded.load();

    return () => {
      eventListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewarded]);

  return { showAd, loadAd };
};

export default useReward;
