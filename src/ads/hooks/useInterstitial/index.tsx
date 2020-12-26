import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  TestIds,
  InterstitialAd,
  AdEventType,
} from '@react-native-firebase/admob';

const useInterstitial = (id: string) => {
  const loadedRef = useRef<boolean | undefined>();
  const showOnLoadRef = useRef<boolean | undefined>();

  const interstitial = useMemo(() => {
    const unitId = __DEV__ ? TestIds.INTERSTITIAL : id;

    return InterstitialAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['music', 'radio', 'player', 'live music'],
    });
  }, [id]);

  const showAd = useCallback(() => {
    if (interstitial.loaded) {
      interstitial.show();
    }
  }, [interstitial]);

  const loadAd = useCallback(() => {
    interstitial.load();
  }, [interstitial]);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.CLOSED || type === AdEventType.ERROR) {
        loadAd();
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
