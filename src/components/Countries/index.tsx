import React, { memo } from 'react';
import { View } from 'react-native';
import COUNTRIES from '~/data/countries';
import Region from '../Region';
import styles from './styles';
import { flag } from '~/services/api';

type CountiesProps = {
  countryId: string;
  setCountryId: (countryId: string) => void;
};

const Counties: React.FC<CountiesProps> = ({ countryId, setCountryId }) => {
  return (
    <View style={styles.container}>
      {COUNTRIES.map((country) => (
        <Region
          key={country.id}
          disabled={country.code !== 'br'}
          id={country.id}
          title={country.name}
          checked={country.code === 'br'}
          image={{ uri: flag(country.code) }}
          onPress={setCountryId}
        />
      ))}
    </View>
  );
};

export default memo(Counties);
