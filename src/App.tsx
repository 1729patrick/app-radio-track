import React from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';

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
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Routes />
    </>
  );
};

export default App;
