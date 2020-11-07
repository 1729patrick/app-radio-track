import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const Albums = ({ points, y }) => {
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      y.value,
      [(height - 70) * 0.25, height - 70],
      [1, 70 / width],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {
          translateY: interpolate(
            y.value,
            [(height - 70) * 0.25, height - 70],
            [0, -(width - 70) / 2 - (height - (width + 181)) / 2],
            Extrapolate.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            y.value,
            [(height - 70) * 0.25, height - 70],
            [0, -(width - 70) / 2],
            Extrapolate.CLAMP,
          ),
        },
        {
          scale,
        },
      ],
    };
  });
  console.log((height - (width + 181)) / 2);

  return (
    <Animated.View style={[{ height: width, width }, style]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        horizontal
        snapToInterval={width}
        disableIntervalMomentum
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(x) => `${x}`}
        renderItem={({ item }) => {
          return (
            <View style={[styles.container]}>
              <View style={styles.image}>
                <Text>Radio:</Text>
              </View>
            </View>
          );
        }}
      />
    </Animated.View>
  );
};

const styles = {
  container: {
    width,
    padding: 20,
  },
  image: {
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#ffbb00',
  },
};

export default Albums;
