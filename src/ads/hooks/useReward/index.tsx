import { useEffect, useMemo, useRef, useState } from 'react';

import {
  TestIds,
  RewardedAd,
  RewardedAdEventType,
} from '@react-native-firebase/admob';

const useReward = (id: string) => {
  const loadedRef = useRef();
  const showOnLoadRef = useRef();
  const rewarded = useMemo(() => {
    const unitId = __DEV__ ? TestIds.REWARDED : id;

    return RewardedAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['music', 'radio', 'player'],
    });
  }, [id]);

  const showAd = () => {
    if (loadedRef.current) {
      rewarded.show();
    } else if (loadedRef.current === undefined) {
      showOnLoadRef.current = true;
    }

    loadedRef.current = false;
  };

  const loadAd = () => {
    rewarded.load();
  };

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error) => {
      if (type === RewardedAdEventType.LOADED) {
        loadedRef.current = true;

        if (showOnLoadRef.current) {
          showAd();
          showOnLoadRef.current = false;
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
