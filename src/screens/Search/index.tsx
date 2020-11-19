import React, { useEffect, useRef } from 'react';
import { BackHandler, Text, TextInput, View } from 'react-native';
import {
  BorderlessButton,
  RectButton,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import MdIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoundButton from '~/components/Button/Round';
import StyleGuide from '~/utils/StyleGuide';

import styles from './styles';
const Search = ({ onCloseSearch }) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      onCloseSearch();

      return true;
    });
  }, [onCloseSearch]);

  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.header}>
        <RoundButton
          onPress={onCloseSearch}
          name={'arrow-back'}
          size={24}
          Icon={Icon}
        />

        <TextInput
          placeholder="Pesquise a rádio"
          ref={inputRef}
          placeholderTextColor={StyleGuide.palette.secondary}
          style={styles.input}
          autoFocus
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
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
            <Text style={styles.itemTitle} numberOfLines={1}>
              1729patrick@gmail.com 1729patrick@gmail.com 1729patrick@gmail.com
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
