import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { memo, RefObject, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import RectButton from '~/components/Buttons/RectButton';
import Header from '~/components/Header';
import Input from '~/components/Input';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import { useKeyboard } from '~/hooks/useKeyboard';
import useStyles from '~/hooks/useStyles';
import api from '~/services/api';
import toast from '~/services/toast';
import StyleGuide from '~/utils/StyleGuide';

import getStyles from './styles';

const keys = [
  { key: 'name', error: 'Preencha o Nome da rádio.' },
  { key: 'slogan', error: 'Preencha o Slogan da rádio.' },
  { key: 'streamURL', error: 'Preencha a Stream URL da rádio.' },
  { key: 'genres', error: 'Preencha os Gêneros da rádio.' },
  { key: 'website', error: 'Preencha o Website da rádio.' },
  { key: 'address', error: 'Preencha o Endereço da rádio.' },
];

const SuggestRadio = () => {
  const { palette } = useTheme();
  const { translateY } = useAnimatedHeader();
  const { keyboardOpen } = useKeyboard();
  const [loading, setLoading] = useState(false);
  const { pop } = useNavigation<StackNavigationProp<any>>();

  const nameRef = useRef<TextInput>(null);
  const sloganRef = useRef<TextInput>(null);
  const streamRef = useRef<TextInput>(null);
  const genresRef = useRef<TextInput>(null);
  const websiteRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const radioRef = useRef<{}>({});

  const styles = useStyles(getStyles);

  const focus = (ref: RefObject<TextInput>) => {
    ref.current?.focus();
  };

  const formIsValid = () => {
    for (let { key, error } of keys) {
      if (!radioRef.current[key]) {
        throw new Error(error);
      }
    }

    return true;
  };

  const onSubmit = async () => {
    try {
      if (!formIsValid()) {
        return;
      }

      setLoading(true);

      await api.post('stations', radioRef.current);
      toast.success({
        message: 'Pedido enviado! Vamos analisar a sua sugestão em breve.',
      });
      pop();
    } catch (e) {
      toast.error({ message: e.message });
      // success();
    } finally {
      setLoading(false);
    }
  };

  const onChangeText = (key: string, value: string) => {
    radioRef.current[key] = value;
  };

  return (
    <View style={[styles.container]}>
      <Header
        translateY={translateY}
        title={'Sugerir estação de rádio'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showRightButtons={false}
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
          onChangeText={(value) => onChangeText('name', value)}
          style={styles.input}
          ref={nameRef}
          onSubmitEditing={() => focus(sloganRef)}
        />
        <Input
          returnKeyType="next"
          placeholder={'Slogan'}
          autoCapitalize={'words'}
          onChangeText={(value) => onChangeText('slogan', value)}
          style={styles.input}
          ref={sloganRef}
          onSubmitEditing={() => focus(streamRef)}
        />
        <Input
          placeholder={'Strem URL'}
          onChangeText={(value) => onChangeText('streamURL', value)}
          autoCapitalize={'none'}
          returnKeyType="next"
          ref={streamRef}
          style={styles.input}
          onSubmitEditing={() => focus(genresRef)}
        />

        <Input
          placeholder={'Gêneros'}
          onChangeText={(value) => onChangeText('genres', value)}
          autoCapitalize={'words'}
          returnKeyType="next"
          style={styles.input}
          ref={genresRef}
          onSubmitEditing={() => focus(websiteRef)}
        />
        <Input
          placeholder={'Website'}
          onChangeText={(value) => onChangeText('website', value)}
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
          onChangeText={(value) => onChangeText('address', value)}
          style={styles.input}
          ref={addressRef}
          onSubmitEditing={() => focus(emailRef)}
        />
        <Input
          placeholder={'Email (opcional)'}
          onChangeText={(value) => onChangeText('email', value)}
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

export default memo(SuggestRadio);
