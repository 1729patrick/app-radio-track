import isEqual from 'lodash.isequal';
import React, { memo, useCallback, useMemo } from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  Linking,
  Text,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import StyleGuide from '~/utils/StyleGuide';
import { HEADER_HEIGHT } from '../../components/Header/constants';
import { RouteProps } from '../../components/TabNavigator';
import { SNAP_POINTS } from '../../constants';
import useScrollPanGestureHandler from '../useScrollPanGestureHandler';
import Programming from './components/Programming';
import styles from './styles';

const { height } = Dimensions.get('window');

type DetailsProps = {
  routeProps: RouteProps;
  animation: Animated.SharedValue<number>;
  lowerBound: Animated.SharedValue<number>;
};

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

const Details: React.FC<DetailsProps> = ({
  routeProps,
  animation,
  lowerBound,
}) => {
  const radio = useMemo(() => {
    let { address, city, region } = routeProps?.radio || {};
    if (!address) {
      address = [city?.name, region?.name].filter((v) => v).join(', ');
    }

    return { ...routeProps?.radio, address } || {};
  }, [routeProps?.radio]);

  const { panHandler } = useScrollPanGestureHandler({
    translateY: animation,
    lowerBound,
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
      transform: [{ translateY: animation.value }],
    };
  }, [animation.value]);

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      lowerBound.value = -(
        nativeEvent.layout.height -
        (height - SNAP_POINTS[0] - HEADER_HEIGHT)
      );
    },
    [lowerBound],
  );

  return (
    <PanGestureHandler
      onGestureEvent={panHandler}
      activeOffsetY={[-10, 10]}
      shouldCancelWhenOutside>
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
