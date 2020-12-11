import isEqual from 'lodash.isequal';
import React, { memo, useCallback, useMemo } from 'react';
import { LayoutChangeEvent, Linking, Text } from 'react-native';
import {
  PanGestureHandler,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import StyleGuide from '~/utils/StyleGuide';
import { RouteProps } from '../../components/TabNavigator';
import useScrollPanGestureHandler from '../useScrollPanGestureHandler';
import Programming from './components/Programming';
import styles from './styles';

type DetailsProps = { routeProps: RouteProps };

const Description = memo(({ description, paddingTop }) => {
  return (
    <>
      <Text style={[styles.title, { paddingTop }]}>Sobre a rádio</Text>
      <Text style={styles.description}>{description}</Text>
    </>
  );
}, isEqual);

const Programming_ = memo(({ programming, paddingTop }) => {
  return (
    <>
      <Text style={[styles.title, { paddingTop }]}>Programação</Text>
      <Programming programming={programming} />
    </>
  );
}, isEqual);

const Address = memo(({ address, paddingTop }) => {
  return (
    <>
      <Text style={[styles.title, { paddingTop }]}>Endereço</Text>
      <Text style={styles.description}>{address}</Text>
    </>
  );
}, isEqual);

const Web = memo(({ web, openSite, paddingTop }) => {
  return (
    <>
      <Text style={[styles.title, { paddingTop }]}>Site</Text>
      <TouchableWithoutFeedback onPress={openSite}>
        <Text style={[styles.description, styles.link]}>{web}</Text>
      </TouchableWithoutFeedback>
    </>
  );
}, isEqual);

const CONTENTS = [
  {
    key: 'description',
    component: Description,
  },
  {
    key: 'programming',
    component: Programming_,
  },
  {
    key: 'address',
    component: Address,
  },
  {
    key: 'web',
    component: Web,
  },
];

const Details: React.FC<DetailsProps> = ({ routeProps }) => {
  const translateY = useSharedValue(0);
  const contentHeight = useSharedValue(0);

  const radio = useMemo(() => {
    return routeProps?.radio || {};
  }, [routeProps?.radio]);

  const { panHandler } = useScrollPanGestureHandler({
    translateY,
    contentHeight,
    contentY: routeProps.contentY,
    animateToPoint: routeProps.animateToPoint,
  });
  const contents = useMemo(() => {
    const contentsFiltered = CONTENTS.filter(({ key }) => !!radio[key]);

    return contentsFiltered.map((content, index) => ({
      ...content,
      paddingTop: StyleGuide.spacing * (!index ? 2 : 4),
    }));
  }, [radio]);

  const openSite = async () => {
    const supported = await Linking.canOpenURL(radio.web);

    if (supported) {
      await Linking.openURL(radio.web);
    }
  };

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  }, [translateY.value]);

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      contentHeight.value = nativeEvent.layout.height;
    },
    [contentHeight],
  );

  return (
    <PanGestureHandler onGestureEvent={panHandler} activeOffsetY={[-10, 10]}>
      <Animated.View style={[styles.container, style]} onLayout={onLayout}>
        {contents.map(({ key, component: Component, paddingTop }) => (
          <Component
            key={key}
            {...{ [key]: radio[key], openSite, paddingTop }}
          />
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default memo(Details, isEqual);
