import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { RegionsType } from '~/contexts/LocationContext';
import { COMPACT_HEIGHT } from '../Player/constants';
import Region from '../Region';
import { BOTTOM_TAB_BAR_HEIGHT } from '../TabBar/Bottom/constants';

type RegionsProps = {
  regions: RegionsType;
  initialRegionId: string;
};

export type RegionsHandler = {
  setRegionId: (countryId: string) => void;
  regionId: string;
};

const Regions: React.ForwardRefRenderFunction<RegionsHandler, RegionsProps> = (
  { regions, initialRegionId = '' },
  ref,
) => {
  const [regionId, setRegionId] = useState(initialRegionId);

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
        paddingBottom: BOTTOM_TAB_BAR_HEIGHT + COMPACT_HEIGHT,
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
