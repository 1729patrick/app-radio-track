import React, { memo, useMemo, useState } from 'react';

import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';


const Banner = ({ id }: { id: string }) => {
  const [error, setError] = useState(false);
  const unitId = useMemo(() => {
    if (__DEV__) {
      return TestIds.BANNER;
    }

    return id;
  }, [id]);

  if (error) {
    return null;
  }

  return (
    <BannerAd
      onAdLoaded={() => {}}
      onAdFailedToLoad={() => setError(true)}
      onAdOpened={() => setError(true)}
      onAdClosed={() => setError(true)}
      onAdLeftApplication={() => {}}
      unitId={unitId}
      size={BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
        keywords: ['music', 'radio', 'player', 'live music'],
      }}
    />
  );
};

export default memo(Banner);
