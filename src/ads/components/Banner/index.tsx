import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import NativeAdView, {
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  TaglineView,
  MediaView,
  StoreView,
} from 'react-native-admob-native-ads';
import StyleGuide from '~/utils/StyleGuide';
import { MEDIA_WIDTH } from './constants';

import styles from './styles';

export default ({ media, id }) => {
  const adUnitID = useMemo(() => {
    return __DEV__ ? 'ca-app-pub-3940256099942544/2247696110' : id;
  }, [id]);

  const [aspectRatio, setAspectRatio] = useState(1);
  const _onAdFailedToLoad = (event) => {
    console.log(event.nativeEvent);
  };

  const _onAdLoaded = () => {
    console.log('Ad has loaded successfully');
  };

  const _onAdClicked = () => {
    console.log('User has clicked the ad');
  };

  const _onAdImpression = () => {
    console.log('Ad impressionr recorded');
  };

  const _onUnifiedNativeAdLoaded = (event) => {
    console.log(event);
    console.log('Views have populated with the Ad');
    console.log(event.aspectRatio);
    setAspectRatio(event.aspectRatio);
  };

  return (
    <NativeAdView
      onAdLoaded={_onAdLoaded}
      onAdFailedToLoad={_onAdFailedToLoad}
      onAdLeftApplication={() => {
        console.log('ad has left the application');
      }}
      onAdClicked={_onAdClicked}
      onAdImpression={_onAdImpression}
      onUnifiedNativeAdLoaded={_onUnifiedNativeAdLoaded}
      refreshInterval={60000 * 2}
      style={styles.container}
      adUnitID={adUnitID} // REPLACE WITH NATIVE_AD_VIDEO_ID for video ads.
    >
      <View style={styles.content}>
        <View style={styles.info}>
          <IconView style={styles.icon} />
          <View style={styles.components}>
            <HeadlineView hello="abc" style={styles.headLine} />
            <TaglineView numberOfLines={2} style={styles.tagLine} />
            <AdvertiserView style={styles.advertiser} />

            <View style={styles.starContainer}>
              <StarRatingView
                starSize={12}
                fullStarColor={StyleGuide.palette.app}
                emptyStarColor={StyleGuide.palette.secondary}
                containerStyle={styles.starRating}
              />

              <StoreView style={styles.store} />
            </View>
          </View>
          <CallToActionView
            style={styles.callToActionButton}
            allCaps
            textStyle={styles.callToActionText}
          />
        </View>

        {media ? (
          <MediaView
            style={[styles.media, { height: MEDIA_WIDTH / aspectRatio }]}
          />
        ) : null}
      </View>
    </NativeAdView>
  );
};
