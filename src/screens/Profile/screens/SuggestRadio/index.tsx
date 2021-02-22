import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RectButton from '~/components/Buttons/RectButton';
import Header from '~/components/Header';
import Input from '~/components/Input';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import useStyles from '~/hooks/useStyles';

import getStyles from './styles';

const SuggestRadio = () => {
  const { palette } = useTheme();
  const { translateY } = useAnimatedHeader();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={'Sugerir estação de rádio'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showSearch={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
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
          placeholder={'Email'}
          onChangeText={() => null}
          style={styles.input}
          // ref={inputRef}
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
        <RectButton
          title={'Enviar'}
          onPress={() => null}
          containerStyle={styles.containerButton}
        />
      </ScrollView>
    </View>
  );
};

export default SuggestRadio;
