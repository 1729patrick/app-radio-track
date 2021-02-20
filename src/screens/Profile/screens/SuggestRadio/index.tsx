import React from 'react';
import { View } from 'react-native';
import Input from '~/components/Input';

import styles from './styles';

const SuggestRadio = () => {
  return (
    <View style={styles.container}>
      <Input
        placeholder={'Nome'}
        onChangeText={() => null}
        style={styles.input}
        // ref={inputRef}
      />
      <Input
        placeholder={'Strem URL'}
        onChangeText={() => null}
        // ref={inputRef}
        style={styles.input}
      />

      <Input
        placeholder={'Gêneros'}
        onChangeText={() => null}
        style={styles.input}
        // ref={inputRef}
      />
      <Input
        placeholder={'Website'}
        onChangeText={() => null}
        // ref={inputRef}
        style={styles.input}
      />
      <Input
        placeholder={'Pais'}
        onChangeText={() => null}
        style={styles.input}
        // ref={inputRef}
      />
      <Input
        placeholder={'Estado'}
        onChangeText={() => null}
        style={styles.input}
        // ref={inputRef}
      />
      <Input
        placeholder={'Email'}
        onChangeText={() => null}
        style={styles.input}
        // ref={inputRef}
      />
    </View>
  );
};

export default SuggestRadio;
