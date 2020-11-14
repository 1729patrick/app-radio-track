import React from 'react';
import { StatusBar } from 'react-native';
import Home from './screens/Home';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Home />
    </>
  );
};

export default App;
