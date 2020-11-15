import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import MdIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';
const Search = () => {
  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.header}>
        <Icon
          name={'arrow-back'}
          size={24}
          color={StyleGuide.palette.primary}
        />
        <TextInput
          placeholder="Pesquise a rádio"
          placeholderTextColor={StyleGuide.palette.secondary}
          style={styles.input}
        />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((x) => (
          <RectButton
            style={styles.itemContainer}
            key={x}
            rippleColor={StyleGuide.palette.secondary}>
            <MdIcon
              name="history"
              color={StyleGuide.palette.secondary}
              size={22}
            />
            <Text style={styles.itemTitle}>
              as dsa d as d as ds d as das {x}
            </Text>
            <Icon
              name="link-sharp"
              color={StyleGuide.palette.secondary}
              size={22}
            />
          </RectButton>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default Search;
