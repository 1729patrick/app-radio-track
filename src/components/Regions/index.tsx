import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { RegionsType } from '~/contexts/LocationContext';
import { COMPACT_HEIGHT } from '../Player/constants';
import Region from '../Region';
import { BOTTOM_TAB_BAR_HEIGHT } from '../TabBar/Bottom/constants';

type RegionsProps = {
  regions: RegionsType;
  initialRegionId?: string;
  paddingBottom?: number;
  onEffectRegionId?: (regionId: string) => void;
};

export type RegionsHandler = {
  setRegionId: (countryId: string) => void;
  regionId: string;
};

const Regions: React.ForwardRefRenderFunction<RegionsHandler, RegionsProps> = (
  {
    regions,
    initialRegionId = '',
    paddingBottom = BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT,
    onEffectRegionId,
  },
  ref,
) => {
  const [regionId, setRegionId] = useState(initialRegionId);

  useEffect(() => {
    onEffectRegionId?.(regionId);
  }, [onEffectRegionId, regionId]);

  useImperativeHandle(
    ref,
    () => ({
      setRegionId,
      regionId,
    }),
    [regionId],
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom,
      }}
      data={regions}
      keyExtractor={(region) => region.id}
      renderItem={({ item: region }) => (
        <Region
          name={region.name}
          id={region.id}
          key={region.id}
          checked={region.id === regionId}
          onPress={setRegionId}
        />
      )}
    />
  );
};

export default memo(forwardRef(Regions));
