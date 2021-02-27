import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from './contexts/ThemeContext';
import Routes from './routes';

import FlashMessage from 'react-native-flash-message';

const App = () => {
  const { mode } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={mode === 'light' ? 'dark-content' : 'light-content'}
        translucent
        backgroundColor="transparent"
      />
      <Routes />
      <FlashMessage position="top" />
    </>
  );
};

export default App;
