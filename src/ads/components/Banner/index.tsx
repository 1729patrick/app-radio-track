import React, { useMemo, useState } from 'react';

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
      // onAdLoaded={(args) => console.log('onAdLoaded', args)}
      onAdFailedToLoad={() => setError(true)}
      // onAdOpened={(args) => console.log('onAdOpened', args)}
      // onAdClosed={(args) => console.log('onAdClosed', args)}

      unitId={unitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
};

export default Banner;
