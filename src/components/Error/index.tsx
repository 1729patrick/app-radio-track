import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const MESSAGES = {
  favoritesEmpty: {
    title: 'Você não possui rádios favoritas',
    description: 'Clique no coração para adicionar as suas rádios favoritas',
  },
  historyEmpty: {
    title: 'Você não ouviu nenhuma rádio',
    description: 'Acompanhe por aqui as rádios que você ouviu',
  },
  'Network Error': {
    title: 'Você está sem internet',
    description: 'Verifique a sua conexão e tente novamente',
  },
};

type ErrorType = {
  type?: 'favoritesEmpty' | 'historyEmpty' | 'Network Error';
};

const Error = ({ type = 'Network Error' }: ErrorType) => {
  const title = useMemo(() => {
    return MESSAGES[type]?.title;
  }, [type]);

  const description = useMemo(() => {
    return MESSAGES[type]?.description;
  }, [type]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default memo(Error);
