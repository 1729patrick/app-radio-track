import React, { useMemo } from 'react';

import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';

const Banner = ({ id }: { id: string }) => {
  const unitId = useMemo(() => {
    if (__DEV__) {
      return TestIds.BANNER;
    }

    return id;
  }, [id]);

  return (
    <BannerAd
      unitId={unitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
};

export default Banner;
