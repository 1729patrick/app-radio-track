import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import Routes from './routes';

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
    </>
  );
};

export default App;
