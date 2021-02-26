import React, { RefObject, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RectButton from '~/components/Buttons/RectButton';
import Header from '~/components/Header';
import Input from '~/components/Input';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import { useKeyboard } from '~/hooks/useKeyboard';
import useStyles from '~/hooks/useStyles';
import StyleGuide from '~/utils/StyleGuide';
import { success } from '~/utils/Toast';

import getStyles from './styles';

const SuggestRadio = () => {
  const { palette } = useTheme();
  const { translateY } = useAnimatedHeader();
  const { keyboardOpen } = useKeyboard();
  const [loading, setLoading] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const sloganRef = useRef<TextInput>(null);
  const streamRef = useRef<TextInput>(null);
  const genresRef = useRef<TextInput>(null);
  const websiteRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const styles = useStyles(getStyles);

  const focus = (ref: RefObject<TextInput>) => {
    ref.current?.focus();
  };

  const onSubmit = () => {
    setLoading(true);
    success();
  };

  return (
    <View style={[styles.container]}>
      <Header
        translateY={translateY}
        title={'Sugerir estação de rádio'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showSearch={false}
      />

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.contentContainer,
          keyboardOpen ? { paddingBottom: StyleGuide.spacing * 3 } : {},
        ]}>
        <Input
          returnKeyType="next"
          placeholder={'Nome'}
          autoCapitalize={'words'}
          onChangeText={() => null}
          style={styles.input}
          ref={nameRef}
          onSubmitEditing={() => focus(sloganRef)}
        />
        <Input
          returnKeyType="next"
          placeholder={'Slogan'}
          autoCapitalize={'words'}
          onChangeText={() => null}
          style={styles.input}
          ref={sloganRef}
          onSubmitEditing={() => focus(streamRef)}
        />
        <Input
          placeholder={'Strem URL'}
          onChangeText={() => null}
          autoCapitalize={'none'}
          returnKeyType="next"
          ref={streamRef}
          style={styles.input}
          onSubmitEditing={() => focus(genresRef)}
        />

        <Input
          placeholder={'Gêneros'}
          onChangeText={() => null}
          autoCapitalize={'words'}
          returnKeyType="next"
          style={styles.input}
          ref={genresRef}
          onSubmitEditing={() => focus(websiteRef)}
        />
        <Input
          placeholder={'Website'}
          onChangeText={() => null}
          autoCapitalize={'none'}
          returnKeyType="next"
          ref={websiteRef}
          style={styles.input}
          onSubmitEditing={() => focus(addressRef)}
        />
        <Input
          returnKeyType="next"
          placeholder={'Endereço'}
          autoCapitalize={'words'}
          onChangeText={() => null}
          style={styles.input}
          ref={addressRef}
          onSubmitEditing={() => focus(emailRef)}
        />
        <Input
          placeholder={'Email (opcional)'}
          onChangeText={() => null}
          autoCapitalize={'none'}
          returnKeyType="next"
          style={styles.input}
          ref={emailRef}
          onSubmitEditing={onSubmit}
        />

        <RectButton
          title={'Enviar'}
          onPress={onSubmit}
          loading={loading}
          containerStyle={styles.containerButton}
        />
      </ScrollView>
    </View>
  );
};

export default SuggestRadio;
