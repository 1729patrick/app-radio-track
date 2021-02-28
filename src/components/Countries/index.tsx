import React, { memo } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import COUNTRIES from '~/data/countries';
import Region from '../Region';
import { flag } from '~/services/api';

type CountiesProps = {
  countryId: string;
  setCountryId: (countryId: string) => void;
};

const Counties: React.FC<CountiesProps> = ({ countryId, setCountryId }) => {
  return (
    <FlatList
      data={COUNTRIES}
      keyExtractor={({ id }) => id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: country }) => {
        return (
          <Region
            disabled={country.code !== 'br'}
            id={country.id}
            title={country.name}
            checked={country.code === 'br'}
            image={{ uri: flag(country.code) }}
            onPress={setCountryId}
          />
        );
      }}
    />
  );
};

export default memo(Counties);
