import React, { useCallback, forwardRef, useState, useEffect } from 'react';
import { usePlayer } from '~/contexts/PlayerContext';
import Radio from '~/components/Radio/Item';

import getStyles from './styles';

import { useHistory } from '~/contexts/HistoryContext';
import { RadioType } from '~/types/Station';
import { FlatList } from 'react-native-gesture-handler';
import Error from '~/components/Error';
import Banner from '~/ads/components/Banner';
import { BLOCKS } from '~/ads/constants';
import { useIsFocused } from '@react-navigation/native';
import Loader from '~/components/Loader';
import { usePlaying } from '~/contexts/PlayingContext';
import useStyles from '~/hooks/useStyles';
import { useTheme } from '~/contexts/ThemeContext';

type HistoryProps = {};

const History: React.ForwardRefRenderFunction<
  FlatList<RadioType>,
  HistoryProps
> = ({}, ref) => {
  const isFocused = useIsFocused();
  const { onExpandPlayer } = usePlayer();
  const { playingRadioId } = usePlaying();
  const [history, setHistory] = useState<RadioType[]>();
  const { getHistory } = useHistory();
  const styles = useStyles(getStyles);
  const { palette } = useTheme();

  useEffect(() => {
    if (isFocused) {
      setHistory(getHistory());
    }
  }, [getHistory, isFocused]);

  const onExpandPlayerPress = useCallback(
    ({ radioIndex }: { radioIndex: number }) => {
      onExpandPlayer({
        title: 'Histórico',
        radios: history,
        radioIndex,
      });
    },
    [onExpandPlayer, history],
  );

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

  if (!history) {
    return <Loader />;
  }

  if (!history?.length) {
    return <Error type="historyEmpty" />;
  }

  return (
    <FlatList
      ref={ref}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={12}
      contentContainerStyle={[styles.contentContainer]}
      showsVerticalScrollIndicator={false}
      data={history}
      keyExtractor={({ id }) => `${id}`}
      renderItem={renderItem}
      onEndReachedThreshold={3}
    />
  );
};

export default forwardRef(History);
