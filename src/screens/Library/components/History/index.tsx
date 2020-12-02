import React, { useCallback, forwardRef, useMemo } from 'react';
import { usePlayer } from '~/contexts/PlayerContext';
import Radio from '~/components/Radio/Item';

import styles from './styles';

import { useHistory } from '~/contexts/HistoryContext';
import { RadioType } from '~/types/Station';
import { FlatList } from 'react-native-gesture-handler';
import Error from '~/components/Error';
import Banner from '~/ads/components/Banner';
import { BLOCKS } from '~/ads/constants';

type HistoryProps = {
  refreshTranslateY: (from: string) => void;
};

const History: React.ForwardRefRenderFunction<
  FlatList<RadioType>,
  HistoryProps
> = ({ refreshTranslateY }, ref) => {
  const { onExpandPlayer } = usePlayer();
  const { history } = useHistory();
  const randomAdIndex = useMemo(() => {
    const randomIndex = (Math.random() * 12).toFixed(0);

    return +randomIndex;
  }, []);

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
            item={item}
            index={index}
            onExpandPlayer={onExpandPlayerPress}
          />
          {index === randomAdIndex && <Banner id={BLOCKS.MUSIC} />}
        </>
      );
    },
    [onExpandPlayerPress, randomAdIndex],
  );

  if (!history.length) {
    return <Error type="historyEmpty" />;
  }

  return (
    <FlatList
      ref={ref}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      initialNumToRender={12}
      contentContainerStyle={[styles.contentContainer]}
      showsVerticalScrollIndicator={false}
      data={history}
      keyExtractor={({ id }) => `${id}`}
      renderItem={renderItem}
      onEndReachedThreshold={3}
      onScrollEndDrag={() => refreshTranslateY('history')}
    />
  );
};

export default forwardRef(History);
