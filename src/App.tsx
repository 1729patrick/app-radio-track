import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <Routes />
    </>
  );
};

export default App;
