import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import COUNTRIES from '~/data/countries';
import Region from '../Region';
import { flag } from '~/services/api';

type CountriesProps = {};

export type CountriesHandler = {
  setCountryId: (countryId: string) => void;
  countryId: string;
};

const Countries: React.ForwardRefRenderFunction<
  CountriesHandler,
  CountriesProps
> = (_, ref) => {
  const [countryId, setCountryId] = useState('');

  useImperativeHandle(
    ref,
    () => ({
      setCountryId,
      countryId,
    }),
    [countryId],
  );

  return (
    <FlatList
      data={COUNTRIES}
      keyExtractor={({ id }) => id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: country }) => {
        return (
          <Region
            // disabled={country.slug !== countryId}
            id={country.id}
            name={country.name}
            checked={country.id === countryId}
            image={{ uri: flag(country.code) }}
            onPress={setCountryId}
          />
        );
      }}
    />
  );
};

export default memo(forwardRef(Countries));
