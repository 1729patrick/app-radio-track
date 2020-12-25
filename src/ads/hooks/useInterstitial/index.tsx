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
    if (loadedRef.current) {
      interstitial.show();
    } else if (loadedRef.current === undefined) {
      showOnLoadRef.current = true;
    }

    loadedRef.current = false;
  }, [interstitial]);

  const loadAd = useCallback(() => {
    interstitial.load();
  }, [interstitial]);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        loadedRef.current = true;

        if (showOnLoadRef.current) {
          showAd();
          showOnLoadRef.current = false;
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
