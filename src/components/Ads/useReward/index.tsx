import { useEffect, useMemo } from 'react';

import {
  TestIds,
  RewardedAd,
  RewardedAdEventType,
} from '@react-native-firebase/admob';

const useReward = (id: string) => {
  const rewarded = useMemo(() => {
    const unitId = __DEV__ ? TestIds.REWARDED : id;

    return RewardedAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['music', 'radio', 'player'],
    });
  }, [id]);

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        rewarded.show();
      }
    });

    return () => {
      eventListener();
    };
  }, [rewarded]);

  const show = () => {
    rewarded.load();
  };

  return { show };
};

export default useReward;
