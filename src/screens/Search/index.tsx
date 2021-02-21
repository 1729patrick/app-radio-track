import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import RoundButton from '~/components/Button/Round';
import { usePlayer } from '~/contexts/PlayerContext';
import { useFetch } from '~/hooks/useFetch';
import { FetchWithPagination } from '~/types/Fetch';
import Radio from '~/components/Radio/Item';

import getStyles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import Error from '~/components/Error';
import Banner from '~/ads/components/Banner';
import { BLOCKS } from '~/ads/constants';
import { usePlaying } from '~/contexts/PlayingContext';

import { useKeyboard } from '~/hooks/useKeyboard';
import History from './components/History';
import { useSearchHistory } from '~/contexts/SearchHistoryContext';
import { useTheme } from '~/contexts/ThemeContext';
import useStyles from '~/hooks/useStyles';

type SearchProps = {
  onCloseSearch: () => void;
};

const Search: React.FC<SearchProps> = () => {
  const { addSearchHistory } = useSearchHistory();
  const { playingRadioId } = usePlaying();
  const [searchTerm, setSearchTerm] = useState('');
  const { height } = useKeyboard();
  const { data, error } = useFetch<FetchWithPagination>(
    searchTerm.trimLeft().trimRight().length >= 3
      ? `/search?q=${searchTerm.trimLeft().trimRight()}`
      : null,
  );
  const { palette } = useTheme();
  const styles = useStyles(getStyles);

  const { pop } = useNavigation<StackNavigationProp<any>>();

  const { onExpandPlayer } = usePlayer();

  const onBackPress = useCallback(() => {
    pop();
  }, [pop]);

  const onClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const onExpandPlayerPress = useCallback(
    ({ radioIndex }: { radioIndex: number }) => {
      const radioName = data[radioIndex]?.name;
      if (radioName) {
        addSearchHistory(radioName);
      }

      onExpandPlayer({
        title: searchTerm || '',
        radios: data?.length ? data : [],
        radioIndex,
      });
      pop();
    },
    [addSearchHistory, data, onExpandPlayer, pop, searchTerm],
  );

  const notFound = useMemo(() => data && !data?.length, [data]);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <>
          <Radio
            playing={playingRadioId === item.id}
            item={item}
            index={index}
            onExpandPlayer={onExpandPlayerPress}
          />
          {!index && (
            <Banner
              id={BLOCKS.MUSIC}
              backgroundColor={palette.backgroundSecondary}
            />
          )}
        </>
      );
    },
    [onExpandPlayerPress, palette.backgroundSecondary, playingRadioId],
  );

  return (
    <Animated.View style={[styles.container]}>
      <View style={styles.header}>
        <RoundButton
          onPress={onBackPress}
          name={'arrowleft'}
          size={24}
          Icon={Icon}
        />

        <TextInput
          placeholder="Pesquise a rádio"
          placeholderTextColor={palette.secondary}
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoFocus
        />

        {!!searchTerm && (
          <RoundButton
            onPress={onClearSearch}
            name={'close'}
            color={palette.light}
            size={24}
            Icon={Icon}
          />
        )}
      </View>

      {notFound && (
        <View style={[styles.notFound, { height }]}>
          <Text style={styles.notFoundTitle}>
            Rádio "{searchTerm}" não encontrada.
          </Text>

          <Text style={styles.notFoundDescription}>
            Tente de novo com um novo termo de busca.
          </Text>
        </View>
      )}

      {!data?.length && !notFound && !!error && <Error type={error?.message} />}

      {!searchTerm && !notFound && <History onPress={setSearchTerm} />}

      {!notFound && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          initialNumToRender={24}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={({ id }) => `${id}`}
          renderItem={renderItem}
        />
      )}
    </Animated.View>
  );
};

export default memo(Search);
