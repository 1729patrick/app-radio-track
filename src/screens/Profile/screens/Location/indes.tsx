import React from 'react';
import Region from '~/components/Region';
import { RegionType } from '~/screens/Explore/components/Regions';
import { REGIONS } from '~/data/regions';

const Location = () => {
  return (
    <>
      {REGIONS.map((region: RegionType) => (
        <Region
          {...region}
          key={region.id}
          checked={region.id === ''}
          onPress={() => null}
        />
      ))}
    </>
  );
};

export default Location;
