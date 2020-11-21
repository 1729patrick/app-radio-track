import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import MdIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoundButton from '~/components/Button/Round';
import { usePlayer } from '~/contexts/PlayerContext';
import radios from '~/services/radios';
import StyleGuide from '~/utils/StyleGuide';
import Radio from '../Playlist/components/Radio';

import styles from './styles';

type SearchProps = {
  onCloseSearch: () => void;
};

const Search: React.FC<SearchProps> = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchs, setSearchs] = useState([]);
  const [search, setSearch] = useState('');
  const inputRef = useRef<TextInput>(null);
  const { pop } = useNavigation();

  const { onOpenPlayer } = usePlayer();

  const onBackPress = () => {
    pop();
  };

  const onClearSearch = () => {
    setSearch('');
  };

  const radios_ = useMemo(() => {
    return radios.map((radio) => {
      return { ...radio, color: StyleGuide.palette.backgroundPrimary };
    });
  }, []);

  const onResultPress = () => {
    inputRef.current?.blur();
    setShowResults(true);
  };

  const onFocusInput = () => {
    setShowResults(false);
  };

  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.header}>
        <RoundButton
          onPress={onBackPress}
          name={'arrow-back'}
          size={24}
          Icon={Icon}
        />

        <TextInput
          placeholder="Pesquise a rádio"
          ref={inputRef}
          placeholderTextColor={StyleGuide.palette.secondary}
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          onFocus={onFocusInput}
          autoFocus
        />

        {!!search && (
          <RoundButton
            onPress={onClearSearch}
            name={'close'}
            size={26}
            Icon={Icon}
          />
        )}
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {!showResults &&
          [search, ...searchs].map(
            (result) =>
              !!search && (
                <RectButton
                  style={styles.itemContainer}
                  key={result}
                  rippleColor={StyleGuide.palette.secondary}
                  onPress={onResultPress}>
                  <MdIcon
                    name="history"
                    color={StyleGuide.palette.secondary}
                    size={22}
                  />
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {result}
                  </Text>
                  <Icon
                    name="link-sharp"
                    color={StyleGuide.palette.secondary}
                    size={22}
                  />
                </RectButton>
              ),
          )}

        {showResults &&
          radios_.map((radio, index) => (
            <Radio
              key={index}
              item={radio}
              index={index}
              onOpenPlayer={({ radioIndex }) =>
                onOpenPlayer({
                  title: radios_[radioIndex].name,
                  radios: [radios_[radioIndex]],
                  radioIndex: 0,
                })
              }
            />
          ))}
      </ScrollView>
    </Animated.View>
  );
};

export default Search;
