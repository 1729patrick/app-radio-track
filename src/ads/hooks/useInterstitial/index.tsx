import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  TestIds,
  InterstitialAd,
  AdEventType,
} from '@react-native-firebase/admob';

const useInterstitial = (id: string) => {
  const loadedRef = useRef<boolean | undefined>(false);

  const interstitial = useMemo(() => {
    const unitId = __DEV__ ? TestIds.INTERSTITIAL : id;

    return InterstitialAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['music', 'radio', 'player', 'live music'],
    });
  }, [id]);

  const showAd = useCallback(() => {
    if (loadedRef.current) {
      interstitial.show();
    }
  }, [interstitial]);

  const loadAd = useCallback(() => {
    loadedRef.current = false;
    interstitial.load();
  }, [interstitial]);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.CLOSED || type === AdEventType.ERROR) {
        loadAd();
      } else if (type === AdEventType.LOADED) {
        loadedRef.current = true;
      }
    });

    interstitial.load();

    return () => {
      eventListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interstitial]);

  useEffect(() => {
    loadAd();
  }, [loadAd]);

  return { showAd };
};

export default useInterstitial;
